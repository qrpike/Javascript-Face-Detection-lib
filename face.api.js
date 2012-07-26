/* 

	Development by Quinton Pike
	contact: qrpike@gmail.com
	
	GitHub: https://github.com/qrpike/Javascript-Face-Detection-lib/ <-- for instructions on using this lib.

*/



// Face Detection Object:
// --------------------------------------------
function faceDetect(params){
	
	var self 		= this;
	self.imgUrl		= params.imageUrl; 
	self.canvasID	= params.canvasID;
	self.image 		= {};
	self.dim 		= {};
	self.numFaces	= null; 
	self.timeElapsed = null;
	self.pos 		= {}; 
	self.maxWidth	= 600 || params.maxWidth;
	self.maxHeight	= 600 || params.maxHeight;
	
	self.getImageDimensions = function(){
		var result = {};
		document.body.appendChild(self.image);
		result['width'] 	= self.image.offsetWidth;
		result['height'] 	= self.image.offsetHeight;
		document.body.removeChild(self.image);
		return result;
	}
	
	self.detectFace = function(cb){ 
	 
	 	self.image 			= new Image();
	 	var elapsed_time 	= (new Date()).getTime(),
	 		canvas 			= document.getElementById(self.canvasID);
		var ctx 			= canvas.getContext("2d");
		
		self.image.onload = function () {
		
			// Variables:
			self.dim 			= self.getImageDimensions();
			var boundingWidth 	= self.maxWidth,
				boundingHeight 	= self.maxHeight, 
				newWidth 		= self.dim.width, 
				newHeight 		= self.dim.height, 
				scale 			= 1;
				
			// Calc Size:
			if (self.dim.width * boundingHeight > boundingWidth * self.dim.height) {
				newWidth 	= boundingWidth;
				newHeight 	= boundingWidth * self.dim.height / self.dim.width;
				scale 		= newWidth / self.dim.width;
			} else {
				newHeight 	= boundingHeight;
				newWidth 	= boundingHeight * self.dim.width / self.dim.height;
				scale 		= newHeight / self.dim.height;
			} 
			
			// Set Canvas Size:
			canvas.width 		= newWidth;
			canvas.style.width 	= newWidth.toString() + "px";
			canvas.height 		= newHeight;
			canvas.style.height	= newHeight.toString() + "px";
			
			// Draw back to Canvas:
			ctx.drawImage(self.image, 0, 0, newWidth, newHeight);
			elapsed_time = (new Date()).getTime();
			
			// Callback function for FaceDetection:
			function callback(comp) {
				  
				self.pos 			= comp;
				self.numFaces 		= comp.length.toString();
				self.timeElapsed 	= Math.round((new Date()).getTime() - elapsed_time).toString() + "ms";  
				ctx.lineWidth 		= 2;
				ctx.strokeStyle 	= 'rgba(230,87,0,0.8)';
				
				/* draw detected area */
				for (var i = 0; i < comp.length; i++) {
					ctx.beginPath();
					ctx.arc(
						(comp[i].x + comp[i].width * 0.5) * scale, 
						(comp[i].y + comp[i].height * 0.5) * scale,
						(comp[i].width + comp[i].height) * 0.25 * scale * 1.2, 0, 
						Math.PI * 2
					);
					ctx.stroke();
				}
				cb();
				
			}
			
			// Run face detection:
			ccv.detect_objects({ 
				"canvas" 		: ccv.grayscale(ccv.pre(self.image)),
				"cascade" 		: cascade,
				"interval" 		: 5,
				"min_neighbors"	: 1,
				"async" 		: true,
				"worker" 		: 1 
			})(callback);
			
		};
		
		// Image Setter:
		self.image.src = self.imgUrl;
		
	}
	
}