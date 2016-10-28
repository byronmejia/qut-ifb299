# 07 - Decoupling Controllers from Models
An important step found after bug hunting with the integration tests
earlier, was the need to begin decoupling the objects from the controllers. 
If time persisted, these decoupled modules can be then individually tested 
using dependency injection.

Unfortunately, Node.JS lacks of any simple dependency injection packages
(example: Dagger, FactoryGirl, Autofac).

My task to help write more tests, was to go through every controller, then model,
then view, and see how to decouple each from eachother. 

I only got up to decoupling all controllers from their required models.

Please see:
  - https://github.com/byronmejia/qut-ifb299/commit/9a855162c757545a035278a8ebd56ef6594b7770
