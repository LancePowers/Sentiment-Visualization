(function () {

    'use strict';

    angular
        .module('app')
        .factory('spoutP5', spoutP5);

    spoutP5.$inject = ['parseP5']

    function spoutP5(parseP5) {
        function Spout(candidate) {
            var self = this;
            this.candidate = JSON.parse(candidate);
            this.color = parseP5.activeComment().color;
            this.word = parseP5.activeComment().word;
            this.show = true;

            this.updateDisplay = function () {

                if (parseP5.activeComment().candidate === self.candidate.name) {
                    this.show = true;
                } else {
                    this.show = false;
                }
                this.color = parseP5.activeComment().color;
                this.word = parseP5.activeComment().word;
            }


            this.sketch = function (p) {
                p.system;

                p.setup = function () {
                    p.createCanvas(400, 400).parent('spoutContainer');
                    p.system = new p.ParticleSystem(p.createVector(self.candidate.position.x, self.candidate.position.y));
                    p.img = p.loadImage(self.candidate.image);
                }
                p.draw = function () {
                    p.background(p.img);
                    self.updateDisplay();
                    if (self.show) {
                        p.system.addParticle();
                        p.system.run();
                        p.textSize(24);
                        p.fill(255, 255, 255);
                        p.text(self.word, 10, 60);
                    }
                }

                // A simple Particle class
                p.Particle = function (position) {
                    this.acceleration = p.createVector(0, 0.05);
                    this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 0));
                    this.position = position.copy();
                    this.lifespan = 255.0;
                };

                p.Particle.prototype.run = function () {
                    this.update();
                    this.display();
                };

                // Method to update position
                p.Particle.prototype.update = function () {
                    this.velocity.add(this.acceleration);
                    this.position.add(this.velocity);
                    this.lifespan -= 2;
                };

                // Method to display
                p.Particle.prototype.display = function () {
                    p.stroke(200, this.lifespan);
                    p.strokeWeight(2);
                    p.fill(self.color.r, self.color.g, self.color.b, this.lifespan);
                    p.ellipse(this.position.x, this.position.y, 12, 12);
                };

                // Is the particle still useful?
                p.Particle.prototype.isDead = function () {
                    if (this.lifespan < 0) {
                        return true;
                    } else {
                        return false;
                    }
                };

                p.ParticleSystem = function (position) {
                    this.origin = position.copy();
                    this.particles = [];
                };

                p.ParticleSystem.prototype.addParticle = function () {
                    this.particles.push(new p.Particle(this.origin));
                };

                p.ParticleSystem.prototype.run = function () {
                    for (var i = this.particles.length - 1; i >= 0; i--) {
                        var pi = this.particles[i];
                        pi.run();
                        if (pi.isDead()) {
                            this.particles.splice(i, 1);
                        }
                    }
                };
            }
        }

        return {
            Spout: Spout
        }

    };

}())