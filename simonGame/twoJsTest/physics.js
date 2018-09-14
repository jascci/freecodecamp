/**
 * Physics
 * A requirified port of Traer Physics from Processing to JavaScript.
 * Copyright (C) 2012 jonobr1
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
(function(){common=function(){var f={},g=Array.prototype,b=Object.prototype,h=b.hasOwnProperty,e=g.slice,c=g.forEach,k=g.indexOf,a=b.toString,d=function(a,d,h){if(null!=a)if(c&&a.forEach===c)a.forEach(d,h);else if(a.length===+a.length)for(var b=0,e=a.length;b<e&&!(b in a&&d.call(h,a[b],b,a)===f);b++);else for(b in a)if(_.has(a,b)&&d.call(h,a[b],b,a)===f)break},q=function(a){return a},m=function(a,d,c){c||(c=q);for(var b=0,h=a.length;b<h;){var e=b+h>>1;c(a[e])<c(d)?b=e+1:h=e}return b};return{has:function(a,
d){return h.call(a,d)},each:d,extend:function(a){d(e.call(arguments,1),function(d){for(var c in d)a[c]=d[c]});return a},indexOf:function(a,d,c){if(null==a)return-1;var b;if(c)return c=m(a,d),a[c]===d?c:-1;if(k&&a.indexOf===k)return a.indexOf(d);c=0;for(b=a.length;c<b;c++)if(c in a&&a[c]===d)return c;return-1},sortedIndex:m,identity:q,isNumber:function(c){return"[object Number]"==a.call(c)},isFunction:function(c){return"[object Function]"==a.call(c)||"function"==typeof c},isUndefined:function(a){return void 0===
a},isNull:function(a){return null===a}}}();Vector=function(f){var g=function(b,h){this.x=b||0;this.y=h||0};f.extend(g.prototype,{set:function(b,h){this.x=b;this.y=h;return this},copy:function(b){this.x=b.x;this.y=b.y;return this},clear:function(){this.y=this.x=0;return this},clone:function(){return new g(this.x,this.y)},add:function(b,h){this.x=b.x+h.x;this.y=b.y+h.y;return this},addSelf:function(b){this.x+=b.x;this.y+=b.y;return this},sub:function(b,h){this.x=b.x-h.x;this.y=b.y-h.y;return this},
subSelf:function(b){this.x-=b.x;this.y-=b.y;return this},multiplySelf:function(b){this.x*=b.x;this.y*=b.y;return this},multiplyScalar:function(b){this.x*=b;this.y*=b;return this},divideScalar:function(b){b?(this.x/=b,this.y/=b):this.set(0,0);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(b){return this.x*b.x+this.y*b.y},lengthSquared:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.lengthSquared())},normalize:function(){return this.divideScalar(this.length())},
distanceTo:function(b){return Math.sqrt(this.distanceToSquared(b))},distanceToSquared:function(b){var h=this.x-b.x;b=this.y-b.y;return h*h+b*b},setLength:function(b){return this.normalize().multiplyScalar(b)},equals:function(b){return 1E-4>this.distanceTo(b)},lerp:function(b,h){return this.set((b.x-this.x)*h+this.x,(b.y-this.y)*h+this.y)},isZero:function(){return 1E-4>this.length()}});return g}(common);this.Physics=Physics=function(f,g,b){function h(){g(h);for(var c=0;c<e.length;c++){var a=e[c];a.playing&&
a.update()}}var e=[],c=function(){this.playing=!1;f.apply(this,arguments);this.animations=[];this.equilibriumCallbacks=[];e.push(this)};b.extend(c,f,{superclass:f});b.extend(c.prototype,f.prototype,{play:function(){if(this.playing)return this;this.playing=!0;this.__equilibrium=!1;return this},pause:function(){this.playing=!1;return this},toggle:function(){this.playing?this.pause():this.play();return this},onUpdate:function(c){if(0<=b.indexOf(this.animations,c)||!b.isFunction(c))return this;this.animations.push(c);
return this},onEquilibrium:function(c){if(0<=b.indexOf(this.equilibriumCallbacks,c)||!b.isFunction(c))return this;this.equilibriumCallbacks.push(c);return this},update:function(){if(this.__optimized&&this.__equilibrium)return this;var c;this.tick();for(c=0;c<this.animations.length;c++)this.animations[c]();if(this.__optimized&&this.__equilibrium)for(c=0;c<this.equilibriumCallbacks.length;c++)this.equilibriumCallbacks[c]();return this}});h();return c}(ParticleSystem=function(f,g,b,h,e,c){var k=function(){this.__equilibriumCriteria=
{particles:!0,springs:!0,attractions:!0};this.__optimized=this.__equilibrium=!1;this.particles=[];this.springs=[];this.attractions=[];this.forces=[];this.integrator=new e(this);this.hasDeadParticles=!1;var a=arguments.length;1===a?(this.gravity=new f(0,arguments[0]),this.drag=k.DEFAULT_DRAG):2===a?(this.gravity=new f(0,arguments[0]),this.drag=arguments[1]):3===a?(this.gravity=new f(arguments[0],arguments[1]),this.drag=arguments[3]):(this.gravity=new f(0,k.DEFAULT_GRAVITY),this.drag=k.DEFAULT_DRAG)};
c.extend(k,{DEFAULT_GRAVITY:0,DEFAULT_DRAG:.001,Attraction:h,Integrator:e,Particle:g,Spring:b,Vector:f});c.extend(k.prototype,{optimize:function(a){this.__optimized=!!a;return this},setGravity:function(a,c){this.gravity.set(a,c);return this},setEquilibriumCriteria:function(a,c,b){this.__equilibriumCriteria.particles=!!a;this.__equilibriumCriteria.springs=!!c;this.__equilibriumCriteria.attractions=!!b},tick:function(){this.integrator.step(0===arguments.length?1:arguments[0]);this.__optimized&&(this.__equilibrium=
!this.needsUpdate());return this},needsUpdate:function(){var a=0;if(this.__equilibriumCriteria.particles)for(a=0,l=this.particles.length;a<l;a++)if(!this.particles[a].resting())return!0;if(this.__equilibriumCriteria.springs)for(a=0,l=this.springs.length;a<l;a++)if(!this.springs[a].resting())return!0;if(this.__equilibriumCriteria.attractions)for(a=0,l=this.attractions.length;a<l;a++)if(!this.attractions[a].resting())return!0;return!1},addParticle:function(a){this.particles.push(a);return this},addSpring:function(a){this.springs.push(a);
return this},addAttraction:function(a){this.attractions.push(a);return this},makeParticle:function(a,d,b){a=c.isNumber(a)?a:1;d=d||0;b=b||0;a=new g(a);a.position.set(d,b);this.addParticle(a);return a},makeSpring:function(a,c,h,e,f){a=new b(a,c,h,e,f);this.addSpring(a);return a},makeAttraction:function(a,c,b,e){a=new h(a,c,b,e);this.addAttraction(a);return a},clear:function(){this.particles.length=0;this.springs.length=0;this.attractions.length=0},applyForces:function(){var a,c;if(!this.gravity.isZero())for(a=
0;a<this.particles.length;a++)this.particles[a].force.addSelf(this.gravity);var b=new f;for(a=0;a<this.particles.length;a++)c=this.particles[a],b.set(-1*c.velocity.x*this.drag,-1*c.velocity.y*this.drag),c.force.addSelf(b);for(a=0;a<this.springs.length;a++)this.springs[a].update();for(a=0;a<this.attractions.length;a++)this.attractions[a].update();for(a=0;a<this.forces.length;a++)this.forces[a].update();return this},clearForces:function(){for(var a=0;a<this.particles.length;a++)this.particles[a].clear();
return this}});return k}(Vector,Particle=function(f,g){var b=function(b){this.position=new f;this.velocity=new f;this.force=new f;this.mass=b;this.fixed=!1;this.age=0;this.dead=!1};g.extend(b.prototype,{distanceTo:function(b){return this.position.distanceTo(b.position)},makeFixed:function(){this.fixed=!0;this.velocity.clear();return this},reset:function(){this.age=0;this.dead=!1;this.position.clear();this.velocity.clear();this.force.clear();this.mass=1;return this},resting:function(){return this.fixed||
this.velocity.isZero()&&this.force.isZero()}});return b}(Vector,common),Spring=function(f,g){var b=function(b,e,c,f,a){this.constant=c;this.damping=f;this.length=a;this.a=b;this.b=e;this.on=!0};g.extend(b.prototype,{currentLength:function(){return this.a.position.distanceTo(this.b.position)},update:function(){var b=this.a,e=this.b;if(!this.on||b.fixed&&e.fixed)return this;var c=(new f).sub(b.position,e.position),k=c.length();0===k?c.clear():c.divideScalar(k);var k=-1*(k-this.length)*this.constant,
a=(new f).sub(b.velocity,e.velocity),a=-1*this.damping*a.dot(c);c.multiplyScalar(k+a);b.fixed||b.force.addSelf(c);e.fixed||e.force.subSelf(c);return this},resting:function(){var b=this.a,e=this.b,c=this.length;return!this.on||b.fixed&&e.fixed||b.fixed&&(0===c?e.position.equals(b.position):e.position.distanceTo(b.position)<=c)&&e.resting()||e.fixed&&(0===c?b.position.equals(e.position):b.position.distanceTo(e.position)<=c)&&b.resting()}});return b}(Vector,common),Attraction=function(f,g){var b=function(b,
e,c,f){this.a=b;this.b=e;this.constant=c;this.on=!0;this.distanceMin=f;this.distanceMinSquared=f*f};g.extend(b.prototype,{update:function(){var b=this.a,e=this.b;if(!(!this.on||b.fixed&&e.fixed)){var c=(new f).sub(b.position,e.position),k=Math.max(c.lengthSquared(),this.distanceMinSquared),a=this.constant*b.mass*e.mass/k,k=Math.sqrt(k);0===a||0===k?c.clear():c.divideScalar(k).multiplyScalar(a);b.fixed||b.force.subSelf(c);e.fixed||e.force.addSelf(c);return this}},resting:function(){var b=this.a,e=
this.b,c=this.distanceMin;return!this.on||b.fixed&&e.fixed||b.fixed&&e.position.distanceTo(b.position)<=c&&e.resting()||e.fixed&&b.position.distanceTo(e.position)<=c&&b.resting()}});return b}(Vector,common),Integrator=function(f,g){var b=function(b){this.s=b;this.originalPositions=[];this.originalVelocities=[];this.k1Forces=[];this.k1Velocities=[];this.k2Forces=[];this.k2Velocities=[];this.k3Forces=[];this.k3Velocities=[];this.k4Forces=[];this.k4Velocities=[]};g.extend(b.prototype,{allocateParticles:function(){for(;this.s.particles.length>
this.originalPositions.length;)this.originalPositions.push(new f),this.originalVelocities.push(new f),this.k1Forces.push(new f),this.k1Velocities.push(new f),this.k2Forces.push(new f),this.k2Velocities.push(new f),this.k3Forces.push(new f),this.k3Velocities.push(new f),this.k4Forces.push(new f),this.k4Velocities.push(new f);return this},step:function(b){var e=this.s,c,f,a,d,g,m,n,p;this.allocateParticles();for(d=0;d<e.particles.length;d++)c=e.particles[d],c.fixed||(this.originalPositions[d].copy(c.position),
this.originalVelocities[d].copy(c.velocity)),c.force.clear();e.applyForces();for(d=0;d<e.particles.length;d++)c=e.particles[d],c.fixed||(this.k1Forces[d].copy(c.force),this.k1Velocities[d].copy(c.velocity)),c.force.clear();for(d=0;d<e.particles.length;d++)c=e.particles[d],c.fixed||(a=this.originalPositions[d],g=this.k1Velocities[d],f=a.x+.5*g.x*b,a=a.y+.5*g.y*b,c.position.set(f,a),a=this.originalVelocities[d],g=this.k1Forces[d],f=a.x+.5*g.x*b/c.mass,a=a.y+.5*g.y*b/c.mass,c.velocity.set(f,a));e.applyForces();
for(d=0;d<e.particles.length;d++)c=e.particles[d],c.fixed||(this.k2Forces[d].copy(c.force),this.k2Velocities[d].copy(c.velocity)),c.force.clear();for(d=0;d<e.particles.length;d++)c=e.particles[d],c.fixed||(a=this.originalPositions[d],m=this.k2Velocities[d],c.position.set(a.x+.5*m.x*b,a.y+.5*m.y*b),a=this.originalVelocities[d],m=this.k2Forces[d],c.velocity.set(a.x+.5*m.x*b/c.mass,a.y+.5*m.y*b/c.mass));e.applyForces();for(d=0;d<e.particles.length;d++)c=e.particles[d],c.fixed||(this.k3Forces[d].copy(c.force),
this.k3Velocities[d].copy(c.velocity)),c.force.clear();for(d=0;d<e.particles.length;d++)c=e.particles[d],c.fixed||(a=this.originalPositions[d],n=this.k3Velocities[d],c.position.set(a.x+n.x*b,a.y+n.y*b),a=this.originalVelocities[d],n=this.k3Forces[d],c.velocity.set(a.x+n.x*b/c.mass,a.y+n.y*b/c.mass));e.applyForces();for(d=0;d<e.particles.length;d++)c=e.particles[d],c.fixed||(this.k4Forces[d].copy(c.force),this.k4Velocities[d].copy(c.velocity));for(d=0;d<e.particles.length;d++)c=e.particles[d],c.age+=
b,c.fixed||(a=this.originalPositions[d],g=this.k1Velocities[d],m=this.k2Velocities[d],n=this.k3Velocities[d],p=this.k4Velocities[d],f=a.x+b/6*(g.x+2*m.x+2*n.x+p.x),a=a.y+b/6*(g.y+2*m.y+2*n.y+p.y),c.position.set(f,a),a=this.originalVelocities[d],g=this.k1Forces[d],m=this.k2Forces[d],n=this.k3Forces[d],p=this.k4Forces[d],f=a.x+b/(6*c.mass)*(g.x+2*m.x+2*n.x+p.x),a=a.y+b/(6*c.mass)*(g.y+2*m.y+2*n.y+p.y),c.velocity.set(f,a));return this}});return b}(Vector,common),common),requestAnimationFrame=function(){var f=
f||this;return f.requestAnimationFrame||f.webkitRequestAnimationFrame||f.mozRequestAnimationFrame||f.oRequestAnimationFrame||f.msRequestAnimationFrame||function(g){f.setTimeout(g,1E3/60)}}(),common)})();
