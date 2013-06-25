describe('pruebas de controladores', function(){
         
         beforeEach(function() {
                    var mock = (function() {
                                var store = {};
                                return {
                                getItem: function(key) {
                                return store[key];
                                },
                                setItem: function(key, value) {
                                store[key] = value.toString();
                                },
                                clear: function() {
                                store = {};
                                }
                                };
                                })();
                    Object.defineProperty(window, 'sessionStorage', { value: mock,configurable:true,enumerable:true,writable:true });                    
                    });
         
         it ('Se prueba el servicio de los usuarios', function () {
             var name = 'Carlos Duque';
             var email = 'carlos.duque@outlook.com';
             var cel = '3008734028';
             var dfr = new $.Deferred();
             dfr.resolve('{data: "data"}')
             spyOn($, 'post').andReturn(dfr);
             spyOn(window, 'exitoso').andCallThrough();
             registrarUsuario(name, email, cel);
             expect(exitoso).toHaveBeenCalledWith(name, email, cel);
             expect(name).toBe(window.localStorage.getItem('nombre'));
             expect(email).toBe(window.localStorage.getItem('email'));
             expect(cel).toBe(window.localStorage.getItem('celular'));
             });
         
         describe('se prueba el servicio del servidor', function(){
                  beforeEach(function(){
                             });
                  it('Se prueba el metodo de solicitud de taxi', function(){
                     var addr = 'calle 100 a # 19-43';
                     var lat = '4.628686020974689';
                     var lon = '-74.09613119577136';
                     var ver_code = '28';
                     var dfr = new $.Deferred();
                     dfr.resolve('{data: {id: \'1\'}');
                     spyOn($, 'post').andReturn(dfr);
                     spyOn(window, 'setInterval');
                     spyOn(window, 'getState').andCallThrough();
                     solicitarServicio(addr, ver_code, lat, lon);
                     expect(window.setInterval).toHaveBeenCalled();
                     });
                  
                  it('Se hace la prueba de obtener el estado de un servicio', function(){
                     var data = {state:"confirmado"};
                     var dfr = new $.Deferred();
                     dfr.resolve($.parseJSON('{"state":"confirmado", "taxi_id": "1"}'));
                     spyOn($, 'get').andReturn(dfr);
                     getState('1');
                     expect($.get).toHaveBeenCalledWith("http://agile-crag-3095.herokuapp.com/services/1.json");
                     });
                  
                  });
         })