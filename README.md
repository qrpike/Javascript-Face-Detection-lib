Javascript Face Detection lib
=============================

GO HERE -> <a href="http://qrpike.github.com/Javascript-Face-Detection-lib">GitHub Page</a>

A Javascript API for detecting multiple faces using HTML5 Canvas and Async Javascript

Use of Object: 
	
	-- HTML --
	
	<script type="text/javascript" src="face.js"></script>
	<script type="text/javascript" src="ccv.js"></script> 
	<script type="text/javascript" src="face.api.js"></script>
	
	<canvas id="output"></canvas> 
	
	<script type="text/javascript">
	var detector = new faceDetect({ imageUrl:'/path/to/local/image' , canvasID:'output' });
	detector.detectFace(function(){
		console.log('Done detecting image');
		// detector.timeElapsed : Time it took to detect faces..
		// detector.numFaces : Number of faces found..
		// detector.pos : Position of the faces..
	});
	</script>