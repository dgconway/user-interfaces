[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10748390&assignment_repo_type=AssignmentRepo)

# CS571-S23 HW09: Badger News

Welcome to Badger News! For this assignment, you will complete a mobile application that allows badgers to get and customize news from their university using just a few taps on their phone!

Following, you will answer questions related to mobile design and design patterns. **Make sure to complete both parts of this assignment.**

!["Finished View"](figures/complete.png)

## Badger News

The starter code provided to you was generated using [expo](https://expo.dev/) and all the necessary libraries for [react navigation](https://reactnavigation.org/) have already been added. See the `package.json` for details. **You should _not_ re-run the expo init command**. Instead, in this directory, simply run...

```bash
npm install
npm start
```

To test your app, you have a few options. If you have a smart device, I would recommend using the expo app for [iOS](https://apps.apple.com/us/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US). You can scan the QR code using your phone, or you can launch commands via the terminal. Otherwise, you can use an emulator (such as [AVD](https://developer.android.com/studio/run/emulator)). Do not use the web browser to test your code; you must test on Android or iOS!

Note that we are writing code in JavaScript for React Native; if you begin writing code in Objective-C, Swift, Java, or Kotlin you are likely doing something _very_ wrong!

### API Notes

All data can be retrieved via API calls to `https://www.cs571.org/s23/hw9/api/`. A brief overview of the API is provided below. There is no further documentation as this API only supports `GET` requests. Please use Postman to explore the API in greater depth.

`https://www.cs571.org/s23/hw9/api/news/articles` returns a short summary of each of the news articles including an `id`, `img`, `title`, and `tags`. You may assume the `id` is unique for each article.

`https://www.cs571.org/s23/hw9/api/news/articles/:articleId` returns the details for a particular article id, e.g. `:articleId` as `3`. **This endpoint is intentionally slow.** These details include all of the properties of the short summary as well as an additional `body` property containing an ordered array of body paragraphs.

### 1. React Navigation

Allow the user to navigate between two tabs: a tab for "News" and a tab for "Preferences". I would recommend using a BottomTabNavigator in `BadgerTabs.js` to navigate between screens for `BadgerNewsScreen.js` and `BadgerPreferencesScreen.js`. You do not need to add any options, icons, or styling to the tabs. **You must use React Navigation for this requirement.**

!["Tab Navigation Starter"](figures/tabs_starter.png)

### 2. Display News

Fetch the short news articles summaries from `https://www.cs571.org/s23/hw9/api/news/articles` and display them to the screen, including their image and title text. I'd recommend creating a component such as `BadgerNewsItemCard` to display each short summary as a card. Use the article's `id` as the unique key.

!["Display news"](figures/complete.png)

### 3. Read News Article

When a news story is selected, the user should be able to see the header image and read the additional body paragraphs about that story _in a Modal_ or _in a nested Stack Navigator_. You may choose which of these you want to use! Using a modal, the article would appear as a secondary overlay; using a Stack Navigator, the article would appear on a seperate screen. If you use a Stack Navigator, only one header bar should be shown. The demo video uses a _nested Stack Navigator_.

In either case, the user should be displayed a message along the lines of "The content is loading!" while waiting for the body paragraphs to load. Furthermore, loading the text content of the article must be _animated_. It may fade in, grow in size, or do some animation using `Animated` or some other third-party library. After finishing reading the article, the user should be able to to return to the list of short summaries.

!["Article Info"](figures/article_info.png)

### 4. Apply Preferences

The user should be able to apply their preferences via the "Preferences" tab. By default, the user should opt in to all content. However, the user should be able to toggle preferences on/off. If the user has a preference toggled off, _any_ news story with that tag should _not_ be displayed to the user. If the user's preferences are so restrictive that there are no articles to be displayed, a message should be displayed saying so (it is also okay for this message to be displayed while the short summaries are loading).

I would recommend using the `BadgerPreferencesContext.js` to store the users preferences. e.g. it may look like this...

```javascript
{
    "chancellor": true,
    "campus": false,
    "science": true,
    "climate": false
}
```

You will need to create this list of unique tags yourself. You may choose to do this by running `reduce` over the list of articles and constructing an array of unique tags, but how you choose to do this is up to you.

Furthermore, I would recommend using `BadgerPreferenceSwitch.js` which has already been implemented for you. This component is a wrapper around the `Switch` component and takes 3 props...

- `initVal`: (optional) `true` or `false` if the switch should be on/off by default
- `prefName`: the name of the preference, e.g. "wellness"
- `handleToggle`: a 2-parameter callback function called on load and whenever the switch is toggled. The first parameter will be the preference name, and the second will be the _new value_ of the switch. e.g. if the user toggles the covid preference off, `handleToggle` will be called with the first argument of "covid" and the second argument of `false`.

!["Preferences"](figures/prefs.png)

### Other Notes

You may assume that each article has a unique `id`. You may _not_ hardcode the number of articles _or_ the names of preferences _anywhere_! Being a busy publishing firm in Madison, these may vary from day-to-day, and we should _not_ assume that they remain the same.

**Tip:** Looking to get your [Third Party Library](https://canvas.wisc.edu/courses/324228/assignments/1691946) assignment done? Use a library such as [Ionicons](https://ionic.io/ionicons) or [Font Awesome](https://fontawesome.com/) to add icons to your tabs. **Using icons is a suggestion, not a requirement.**

!["Tabs Complete"](figures/tabs.png)

### Submission Details

In addition to your code, **you will also need to submit a video recording of your app**. Like the demo video, it should cover all the tasks below. Please thoroughly demonstrate all tasks to showcase the capabilities of your app.

**Please embed your recording as a _Kaltura video_ as a part of the assignment submission.**

#### Tasks

- Show the short summaries of all news stories.
- Read 2 specific news stories and navigate back to the main news screen.
- Update the preferences to exclude 2 preferences and show that the news items have changed accordingly.
- Update the preferences to exclude all preferences to show the warning message.

---

## Mobile Design and Design Patterns

The questions below will ask you about the mobile design and design patterns used in the Badger News app that you had just implemented. For each question, please write a response grounded in content from the "Mobile Design" lecture, the "Design Patterns" lecture, or other reputable sources. I would expect 2-4 sentences per response.

1. In what way(s) is Badger News (implemented in this homework) more mobile-friendly than Badger Bakery (implemented in the last homework)?

Badger News allows us to navigate between the pages with a tab menu at the bottom of the screen instead of Badger Bakery's quasi-carousel model located at the top of the screen. This is more mobile-friendly because it is easier for users to reach the menu icons at the bottom of the screen, especially if they are using their mobile device with one hand. The UX of switching tabs at the bottom of the screen is also easier for users to recognize because it is very common, another way that this tab menu makes Badger News more mobile-friendly.
Furthermore, the Badger News app is more mobile friendly because it uses animations (it makes the article text fade in after loading), whereas Badger Bakery uses no animations. Animations make apps feel more mobile friendly because it makes transitions feel smoother.

2. Name a perceptible affordance within your app, what does it do? Then, name a hidden affordance that _could_ be implemented, what would it do?

The toggle buttons are a perceptible affordance within the app because they afford clicking. When a user clicks on the button, they can toggle whether they want to see articles that contain certain features.
We could add a hidden affordance of describing the toggle buttons when the user hovers over the text above the buttons. Currently, the toggle buttons are described when the user clicks on the text above the buttons. This might be a useful hidden affordance because users are more likely to discover it (i.e. more likely to hover over the buttons) than click on the text.

3. One of the design paradigms that we discussed in class was "metaphoric design". What could be done to make our app design more metaphoric? What would be the benefits and consequences of a more metaphoric design?

Our app design could be made more metaphoric by changing the icon underneath the "News" tab to a newspaper icon. Additionally, we could enhance the 'newspaper' metaphor for our app by making the headlines larger and show a short preview of the article for each article, and then when a user clicks on the image, headline, or preview of the article, they would be taken to the longer article.
The benefits of metaphoric design is that it is easy for novice users to use and it works well in interfaces where the interface simulates a real world system. The consequences of metaphoric desgin is that it is not easy to scale up and add new features because any new features that would be added would need to incorporate the existing metaphor. Additionally, if our app is intended to be used worldwide, cultural differences may be a concern (because, for instance, different colors have different meanings in different cultures).

4. Briefly describe the business goal(s) and posture level of this application. Then, what is a task a user may try to accomplish? How does your app support this task?

The business goal of this application is to make money through advertisements (which we of course have not yet implemented) by getting our readers to spend a lot of time on our site and read a lot of articles. Alternatively, we may be a sponsored news site, in which case our business goal is purely to get people to read our articles and we don't need to worry about advertising because we have some 3rd party funding our articles and likely dictating the content we produce. The posture level of this application is a news site.

One task a user may try to accomplish is reading an article. Our app supports this task by allowing users to click on the image for an article or the header of the article to open the article.
