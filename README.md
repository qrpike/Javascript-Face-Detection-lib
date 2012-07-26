Javascript-Face-Detection-lib
=============================

A Javascript API for detecting multiple faces using HTML5 Canvas and Async Javascript

Use of Object:
  
	Must include before this file: (These were not written by me)
	ccv.js
	face.js
	
	-- HTML --
	
	<canvas id="output"></canvas>
	
	
	
	-- Javascript -- 
	
	var detector = new faceDetect({ imageUrl:'/path/to/local/image' , canvasID:'output' });
	detector.detectFace(function(){
		console.log('Done detecting image');
		// detector.timeElapsed : Time it took to detect faces..
		// detector.numFaces : Number of faces found..
		// detector.pos : Position of the faces..
	});