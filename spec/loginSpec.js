describe("El html carga los tres inputs de login", function() {
	beforeEach(function() {
		jasmine.getFixtures().fixturesPath = 'assets/www';
		loadFixtures('login.html');
		alert = jasmine.createSpy('alert() spy');
	});

	it("revisar cuando un input esta mal escrito y los otros bien", function() {
		expect(validateValues("", "carlosda@hotmail.com", 3008328392)).toBeFalsy();
		expect(validateValues("carlosda@", "hotmail.com", 3008328392)).toBeFalsy();
		expect(validateValues("carlosda", "carlosda@hotmail.com", 3008328)).toBeFalsy();
	});

	it("los input estan bien escritos", function() {
		expect(validateValues("carlosda", "carlosda@hotmail.com", 3008328392)).not.toBeFalsy();
	});
});
