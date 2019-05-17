/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function () {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('Are defined', function () {
      expect(allFeeds).toBeDefined()
      expect(allFeeds.length).not.toBe(0)
    })
    // test to ensure that Every feed have URL
    it('Every feed have URL', function () {
      for (let feeds in allFeeds) {
        expect(allFeeds[feeds].url).toBeDefined()
        expect(allFeeds[feeds].url.length).not.toBe(0)
      }
    })
    // test to ensure that Every feed have defined name and not empty
    it('Every feed have defined name and not empty', function () {
      for (let feeds in allFeeds) {
        expect(allFeeds[feeds].name).toBeDefined()
        expect(allFeeds[feeds].name.length).not.toBe(0)
      }
    })
  })
  // new suite for the menu
  describe('The menu', function () {
    // test to ensure that Menu element is hidden by default
    it('Menu element is hidden by default', function () {
      expect($('body').hasClass('menu-hidden')).toBe(true)
    })
    // test to ensure that when clicked the menu change visibility of it
    it('Menu change visibility when the menu icon is clicked', function () {
      // when click on the menu icon
      $('.menu-icon-link').click()
      expect($('body').hasClass('menu-hidden')).toBe(false)
      // when click to close the menu
      $('.menu-icon-link').click()
      expect($('body').hasClass('menu-hidden')).toBe(true)
    })
  })
  // new suite for the Initial Entries
  describe('Initial Entries', function () {
    beforeEach((done) => {
      loadFeed(0, () => {
        done()
      })
    })
    // test to ensure that Have at least a single entry when feeds is loaded
    it('Have at least a single entry when feeds is loaded', function () {
      expect($('.feed .entry').length).toBeGreaterThan(0)
    })
  })
// new suite for the New Feed Selection
  describe('New Feed Selection', function () {
    // save varible for the result to use it in the test
    let firstLoadFeed, SecondLoadFeed
    beforeEach((done) => {
      loadFeed(0, () => {
        firstLoadFeed = $('.feed').children(allFeeds.url).html()
      })
      loadFeed(1, () => {
        SecondLoadFeed = $('.feed').children(allFeeds.url).html()
        done()
      })
    })
      // test to ensure that The feeds changing by every loads
    it('The feeds changing by every loads', function () {
      expect(firstLoadFeed).not.toBe(SecondLoadFeed)
    })
  })
}())
