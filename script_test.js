const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('safari')
    .build();

driver.get('http://vnisevychx.ml');

driver.sleep(3000).then(function() {

//should check if photos are displaying in gallery
driver.findElement(By.css('.category div')).click();

driver.sleep(2000).then(function() {
  if(driver.findElement(By.css('.carousel-item'))) {
	console.log('test passed');	
  } else {
    console.log('test failed');
  }
  driver.findElement(By.id('btnBack')).click();


//should navigate to About Me section
driver.findElement(By.css('.nav > li:nth-child(2) a')).click();

driver.sleep(2000).then(function() {
  driver.executeScript('return window.scrollY').then(function(winPos) {
    if(driver.findElement(By.id('about')).offsetTop == winPos) {
      console.log('test passed');	
    } else {
      console.log(winPos);
      console.log(driver.findElement(By.id('about')).offsetTop);
      console.log('test failed');
    }

    driver.quit();
  });
});

});


});