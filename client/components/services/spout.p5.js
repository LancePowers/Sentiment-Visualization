(function () {

    'use strict';

    angular
        .module('app')
        .factory('spoutP5', spoutP5);

    spoutP5.$inject = ['parseP5']

    function spoutP5(parseP5) {
        var color = {
            r: 10,
            g: 200,
            b: 10
        }
        var word = 'Word'
        var entities = parseP5.entities;
        var index = 0;

        var setColor = function (newColor) {
            color = newColor;
        }

        var setWord = function (newWord) {
            word = newWord;
        }

        setInterval(function () {
            setColor(entities[index].color);
            setWord(entities[index].label);
            index++;
        }, 3000);


        var sketch = function (p) {
            p.system;

            p.setup = function () {
                console.log(this);
                p.createCanvas(720, 400);
                p.system = new p.ParticleSystem(p.createVector(p.width / 2, 50));
                p.img = p.loadImage('http://a4.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE4MDAzNDEwMDU4NTc3NDIy.jpg');
            }
            p.draw = function () {
                p.background(p.img);
                p.system.addParticle();
                p.system.run();
                p.textSize(32);
                p.fill(0, 102, 153);
                p.text(word, 10, 60);
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
        return {
            sketch: sketch,
            setColor: function (newColor) {
                setColor(newColor);
            },
            setWord: function (newWord) {
                setWord(newWord);
            }
        }

    };

}())