(function () {

    'use strict';

    angular
        .module('app')
        .factory('spoutP5', spoutP5);

    spoutP5.$inject = ['parseP5']

    function spoutP5(parseP5) {
        function Spout(candidate) {
            var color = {
                r: 10,
                g: 200,
                b: 10
            }
            this.candidate = candidate;
            var image = '';
            var word = 'Word';
            this.entities = [];
            this.index = 0;

            this.setColor = function (newColor) {
                color = newColor;
            }

            this.setWord = function (newWord) {
                word = newWord;
            }
            this.setImage = function (newImage) {
                image = newImage;
            }
            var show = true;
            var self = this;
            setInterval(function () {
                if (self.entities[self.index].candidate === self.candidate) {
                    show = true;
                } else {
                    show = false;
                }
                self.setColor(self.entities[self.index].color);

                self.setWord(self.entities[self.index].label);
                self.index++;
            }, 3000);

            this.sketch = function (p) {
                p.system;

                p.setup = function () {
                    p.createCanvas(400, 400);
                    p.system = new p.ParticleSystem(p.createVector(p.width / 2, 250));
                    p.img = p.loadImage(image);
                }
                p.draw = function () {
                    p.background(p.img);
                    if (show) {
                        p.system.addParticle();
                        p.system.run();
                        p.textSize(32);
                        p.fill(255, 255, 255);
                        p.text(word, 10, 60);
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
                    p.fill(color.r, color.g, color.b, this.lifespan);
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
        Spout.prototype.setEntities = function (entities) {
            this.entities = entities;
        }

        Spout.prototype.setCandidate = function (candidate) {


            switch (candidate) {
            case "CLINTON":
                this.setImage('http://a4.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE4MDAzNDEwMDU4NTc3NDIy.jpg')
                break;
            case "CHAFEE":
                this.setImage('http://d229l5sflpl9cp.cloudfront.net/canphoto/2569_lg.jpg')
                break;
            case "WEBB":
                this.setImage('http://gainesvillescene.com/wp-content/uploads/2015/08/Jim-Webb-300x300.jpg')
                break;
            case "SANDERS":
                this.setImage('http://blurbrain.com/wp-content/uploads/2015/03/Bernie-Sanders.jpg')
                break;
            case "O’ MALLEY":
                this.setImage('http://absolutecosplay.com/wp-content/uploads/2015/07/14366448254441-martin-omalley-300x300.jpg')
            default:
                this.setImage('http://www.officeplayground.com/Assets/ProductPreview/pi2700-2899/2762_flagball_1b.jpg')
            }
        }
        return {
            Spout: Spout
        }

    };

}())