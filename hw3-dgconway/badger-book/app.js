/**
 * get data from the API and store it in the global variable allStudents
 */
let allStudents;
$.ajax({
	url: "https://cs571.org/s23/hw3/api/students", 
	headers: { 'X-CS571-ID': 'bid_4c2e0a660c7168a42f85' }, 
	success: (res) => {
		allStudents = res;
		$("#students").html(buildStudentsHtml(res, []));
  }});

/**
 * Allow us to filter by clicking enter while in any of the filter fields
 */
// adapted from https://stackoverflow.com/questions/14542062/eventlistener-enter-key
for (i of ['search-name', 'search-major', 'search-interest']){
		$(`#${i}`).on("keypress", (e) => {
			if (e.key === 'Enter') {
				$("#search-btn").trigger("click")
			}
		});
}

// Reset the list of students 
$(() => {
	$("#reset-search-btn").on("click", () => {
		$("#students").html(buildStudentsHtml(allStudents, []));

		// also reset the search boxes
		$("#search-name").val("")
		$("#search-major").val("")
		$("#search-interest").val("")
	});
  });

/**
 * When we click on the search button, we perform a case-insensitive search
 * through all the students to find students whose names, major, or interests
 * match the interests that we are filtering by
 */
$(() => {
	$("#search-btn").on("click", () => {
	const nameFilter = $("#search-name").val();
	const majorFilter = $("#search-major").val();
	const interestFilter = $("#search-interest").val();

	let filteredStudents = allStudents;

	let highlightParam = {};

	if (nameFilter) {
		highlightParam.studName = nameFilter;
		filteredStudents = filteredStudents.filter(stud => {
			const firstName = stud.name.first.toLowerCase();
			const lastName = stud.name.last.toLowerCase();

			// get the students' full name
			const fullName = firstName + " " + lastName;
			const lowerCaseName = nameFilter.toLowerCase();

			// check whether the students' full name contains the string we entered with a case-insensitive search
			return fullName.includes(lowerCaseName);
	});
	}
	if (majorFilter) {
		highlightParam.major = majorFilter;
		// if the major filter is not empty, filter by major
		filteredStudents = filteredStudents.filter(stud => stud.major.toLowerCase().includes(majorFilter.toLowerCase()));

		// highlight the part of the major that we matched
	}
	if (interestFilter) {
		highlightParam.interest = interestFilter;
		// if the interest filter is not empty, filter by interest
		filteredStudents = filteredStudents.filter(stud => 
			stud.interests.some(interest => interest.toLowerCase().includes(interestFilter.toLowerCase()))
		)
	}
	$("#students").html(buildStudentsHtml(filteredStudents, highlightParam));
})
})

/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs, highlightParam) {
	return studs.map(stud => buildStudentHtml(stud, highlightParam)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud the data of one student
 * @returns a formatted html string with information about that student
 */
function buildStudentHtml(stud, highlightParam) {
	// add the right class to get the bootstrap styling to get: 
	// 1 column of students on xs devices
	// 2 columns of students on sm devices
	// 3 columns of students on md devices
	// 4 columns of students on lg devices
	// 6 columns of students on xl devices
	let html = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 single-student">`;

	let studName = `${stud.name.first} ${stud.name.last}`;
	
	// highlight the part of the students' name that matches the query
	if (highlightParam.studName) {
		const lowercaseName = studName.toLowerCase();
		const index = lowercaseName.indexOf(highlightParam.studName.toLowerCase());
		studName = `${studName.slice(0, index)}<strong class="text-primary">${studName.slice(index, index+highlightParam.studName.length)}</strong>${studName.slice(index+highlightParam.studName.length)}`;
	}

	html += `<h2><u>${studName}</u></h2>`;

	// add the students' major
	let studMajor = stud.major;
	const lowercaseMajor = studMajor.toLowerCase();
	
	// highlight the part of the students' major that matches the query
	if (highlightParam.major) {
		const index = lowercaseMajor.indexOf(highlightParam.major.toLowerCase());
		studMajor = `${studMajor.slice(0, index)}<strong class="text-primary">${studMajor.slice(index, index+highlightParam.major.length)}</strong>${studMajor.slice(index+highlightParam.major.length)}`;
	}
	html += `<div>Major: ${studMajor}</div>`;

	// add some sassy comments about the students' major of choice

	// regex to match "computer science", "computer and data science", 
	// "comp sci" and "comp and data sci" to cover the cases of those pesky data scientists
	const regexForCS = /comp.+sci/;

	if (!regexForCS.test(lowercaseMajor) && 
	lowercaseMajor !=="cs") {
		html += `<div><em>Ooh! A major other than CS!</em></div>`;
	}

	// identify the other insane people in this class
	if (lowercaseMajor.includes("math") && !(stud.name.first === "Donald" && stud.name.last==="Conway")) {
		html += `<div><strong>A fellow math major?!? Gasp!</strong></div>`;
	}

	// add the number of credits the student is taking
	html += `<div>Currently enrolled in: ${stud.numCredits} credits. ${stud.numCredits>16 ? "That's a lot of credits.": ''}</div>`;

	// add content for whether the student is or (regretably) is not from WI
	if (stud.fromWisconsin) {
		html += `<div>They are from Wisconsin, the best state.</div>`;
	} else {
		html += `<div>They are tragically not from Wisconsin, and the veracity of this statement breaks my tender heart.</div>`;
	}

	// add the students' interests in an ul
	html += `<div>They have ${stud.interests.length} interests:</div>`;
	html += `<ul>`;
	stud.interests.forEach((interest) => {
		// highlight the part of the students' interests that matches the query
		if (highlightParam.interest && interest.toLowerCase().includes(highlightParam.interest.toLowerCase())) {
			const lowercaseInterest = interest.toLowerCase();
			const index = lowercaseInterest.indexOf(highlightParam.interest.toLowerCase());
			interest = `${interest.slice(0, index)}<strong class="text-primary">${interest.slice(index, index+highlightParam.interest.length)}</strong>${interest.slice(index+highlightParam.interest.length)}`;
		}
		html += `<li>${interest}</li>`;
	})
	html += `</ul>`;
	html += `</div>`;
	
	return html;
}
