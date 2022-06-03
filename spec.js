describe('Protractor Demo App', function() {
  browser.ignoreSynchronization = true

  const loginAgent = {
    mail : 'agent@neadz.com',
    password : 'password'
  };
  const mailFreelance = Math.random();
  const mailCompany = Math.random();

  const freelanceInfos = {
    mail : mailFreelance + '@neadz.it',
    password : 'password',
    firstName : 'John',
    lastName : 'Cena',
    phone : '0612345678'
  };

  const companyInfos = {
    name : 'SFR',
    street : '46 rue des Pétunias',
    zipcode : '75011',
    city : 'Paris',
    country : 'France',
    phone : '0612345678'
  };

  const needInfos = {
    name : 'Lead Développeur Android',
    TJM :  '745',
    level : 'EXPERT',
    description : 'Ceci est une petite description ma foi fort sympatique',
    startDateMonth : 'Juin', // Don't forget to capitalize
    startDateYear : '2021',
    duration : '5',
    durationType : 'Années', // 'Semaines' 'Mois' 'Années'
    techPrimary : ['azure', 'aws', 'angular', 'babel'],
    // Note that if you just write "angular", it will pick the first display, in this case, "Angular 2"
    techSecondary : ['appcelerator', 'apache', 'android', 'bugsense']
  }

  const companyContactInfos = {
    firstName : 'Guillaume',
    lastName : 'Orange',
    title : 'Empreur',
    phone : '0612345678',
    email : mailCompany + '@hitmrmiss.it',
    password : 'password'
  }

  function write (data, input) {
    data.split('').forEach((character) => input.sendKeys(character));
  }

  function addTechs(remove, techArray, input){
    // if remove it set to true, after add the tech it will delete them once, and re-add them after
    for(i = 0; i < techArray.length; i++){    
      write(techArray[i], input);
      element(by.css('.mat-option-text')).click();
      if(remove){
        element(by.css('.tech-container .cross')).click();
      }
    }
    // Once we run add end delete techs we re-add them without delete this time
    if(remove){
      addTechs(false, techArray, input);
    }
  }

  beforeEach(function() {
    browser.get('http://localhost:4200/');
  });

  it('should have a title', function() {
    // todo: Check if auth/login load
    expect(browser.getTitle()).toEqual('Neadz');
  });

  // This test connect as an agent and create a freelance
  it('manage to connect as agent', function() {
    const inputMailLogin = element(by.id('email'));
    const inputPasswordLogin = element(by.id('password'));
    const inputSubmit = element(by.id('submit'));

    write(loginAgent.mail, inputMailLogin);
    write(loginAgent.password, inputPasswordLogin);
    inputSubmit.click();

    browser.sleep(500);

    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/agent/freelances');

    const addFreelanceButton = element(by.id('addFreelance'));
    addFreelanceButton.click();

    const inputEmail = element(by.id('account-email'));
    const inputPassword = element(by.id('account-password'));
    const inputFirstname = element(by.id('account-firstName'));
    const inputLastname = element(by.id('account-lastName'));
    const inputPhone = element(by.id('account-phone'));
    const inputValidate = element(by.id('submit'));

    write(freelanceInfos.mail, inputEmail);
    write(freelanceInfos.password, inputPassword);
    write(freelanceInfos.firstName, inputFirstname);
    write(freelanceInfos.lastName, inputLastname);
    write(freelanceInfos.phone, inputPhone);

    inputValidate.click();

    // todo: Change the way to do this
    browser.sleep(500);
    
    expect(browser.getCurrentUrl()).not.toEqual('http://localhost:4200/agent/freelances');
  });

  //Connect as agent and create a company, un contact et un besoin
  it('Connect as agent and create a company, a contact and a need', function(){
    const inputMailLogin = element(by.id('email'));
    const inputPasswordLogin = element(by.id('password'));
    const inputSubmit = element(by.id('submit'));

    write(loginAgent.mail, inputMailLogin);
    write(loginAgent.password, inputPasswordLogin);
    inputSubmit.click();

    browser.sleep(500);

    // improve the click on "entreprise"
    element.all(by.css('.navigation a')).last().click();

    browser.sleep(500);

    element(by.css('.search-box-container button')).click();

    browser.sleep(500);

    const inputNameCompany = element(by.id('company-name'));
    const inputStreetCompany = element(by.id('company-street'));
    const inputZipcodeCompany = element(by.id('company-zipcode'));
    const inputCityCompany = element(by.id('company-city'));
    const inputCountryCompany = element(by.id('company-country'));
    const inputPhoneCompany = element(by.id('company-phone'));
    const inputValidateCompany = element(by.css('.modal-footer button'));

    write(companyInfos.name, inputNameCompany);
    write(companyInfos.street, inputStreetCompany);
    write(companyInfos.zipcode, inputZipcodeCompany);
    write(companyInfos.city, inputCityCompany);
    write(companyInfos.country, inputCountryCompany);
    write(companyInfos.phone, inputPhoneCompany);

    inputValidateCompany.click();

    browser.sleep(1000);

    expect(browser.getCurrentUrl()).not.toEqual('http://localhost:4200/agent/entreprises');

    element.all(by.css('.menu-company li')).last().click();

    element(by.css('.add-card')).click();

    const inputFirstName = element(by.id('account-firstName'));
    const inputLastName = element(by.id('account-lastName'));
    const inputTitle = element(by.id('account-title'));
    const inputPhone = element(by.id('account-phone'));
    const inputMail = element(by.id('account-email'));
    const inputPassword = element(by.id('account-password'));
    const inputValidate = element(by.css('.modal-footer button'));

    write(companyContactInfos.firstName, inputFirstName);
    write(companyContactInfos.lastName, inputLastName);
    write(companyContactInfos.title, inputTitle);
    write(companyContactInfos.phone, inputPhone);
    write(companyContactInfos.email, inputMail);
    write(companyContactInfos.password, inputPassword);

    inputValidate.click();

    browser.sleep(500);

    element.all(by.css('.menu-company li')).first().click();
    // Create Need
    element(by.css('.create-need')).click();
    
    const inputNameNeed = element(by.id('need-jobTitle'));
    const inputTJMNeed = element(by.id('need-tjm'));
    const inputDescriptionNeed = element(by.id('need-description'));
    const inputDurationLast = element(by.id('need-durationLast'));
    const inputTechnoPrimary = element(by.id('need-techsPrimary'));
    const inputTechnoSecondary = element(by.id('need-techsSecondary'));
    const inputCreate = element(by.css('.modal-footer button'));
    
    
    write(needInfos.name, inputNameNeed);
    write(needInfos.TJM, inputTJMNeed);
    
    
    
    element.all(by.css('.xp-levels button')).filter(function(elem) {
      return elem.getText().then(function(text){
        return text === needInfos.level;
      });
    }).first().click();

    
    write(needInfos.description, inputDescriptionNeed);

    element(by.cssContainingText('option', 'Le plus tôt possible')).click();

    element(by.cssContainingText('option', 'À partir de')).click();
    element(by.cssContainingText('option', needInfos.startDateMonth)).click();

    write(needInfos.duration, inputDurationLast);
    element(by.cssContainingText('option', needInfos.durationType)).click();

    addTechs(true, needInfos.techPrimary, inputTechnoPrimary);
    addTechs(false, needInfos.techSecondary, inputTechnoSecondary);
    
    element(by.cssContainingText('option', companyContactInfos.lastName + ' ' + companyContactInfos.firstName)).click();

    inputCreate.click();
  })

  // Connect as the freelance we just created
  it('Manage to connect as freelance previously created', function(){
    const inputMailLogin = element(by.id('email'));
    const inputPasswordLogin = element(by.id('password'));
    const inputSubmit = element(by.id('submit'));

    write(freelanceInfos.mail, inputMailLogin);
    write(freelanceInfos.password, inputPasswordLogin);
    inputSubmit.click();

    browser.sleep(500);

    expect(browser.getCurrentUrl()).not.toEqual('http://localhost:4200/auth/login');
  })
});
