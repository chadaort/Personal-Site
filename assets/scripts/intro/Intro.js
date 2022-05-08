import VideoPlayer from './VideoPlayer';

const GRID_ASSETS = [
	'content/snopes/intro-thumb.png',
	'content/aion-launch/intro-thumb.png',
	'content/blade-and-soul-teaser/intro-thumb.png',
	'content/guildwars2-launch/intro-thumb.png',
	'content/lineage2-goddess-of-destruction/intro-thumb.png',
	'content/lineage2-goddess-of-destruction/intro-thumb-2.png',
	'content/ncsoft-redesign/intro-thumb.png',
	'content/tv-tropes/intro-thumb.png',
	'content/ad-tech-video-player/intro-thumb.png',
	'wildstar-trailer.mp4',
	'content/carbine-studios-redesign/intro-thumb.png',
	'content/city-of-heroes-free-to-play/intro-thumb.png',
	'content/city-of-heroes-going-rogue/intro-thumb.png',
	'content/element-gallery/intro-thumb.png',
	'content/lineage2-redesign/intro-thumb.png',
	'content/lineage2-tauti/intro-thumb.png',
	'content/ncsoft-redesign/intro-thumb.png',
	'content/ncsoft-refresh/intro-thumb.png',
	'content/snopes/intro-thumb.png',
	'content/snopes/intro-thumb-2.png',
	'content/snopes-webhook-consumer/intro-thumb.png',
	'content/wildstar-teaser/intro-thumb.png',
	'content/my-aion/intro-thumb.png',
	'content/guildwars2-teaser/intro-thumb.png'
];

const CANVAS_ASSETS = {
	topLeftMask: 'light-intro-top-left-mask.png',
	bottomRightMask: 'light-intro-btm-right-mask.png'
};

const GRADIENT_COLORS = [
	'#2f9986',
	'#f16b7a',
	'#ffd531',
	'#9754fb',
	'#58fb54',
	'#fb8b54'
];

/**
 * Builds a canvas that displays a grid of projects with a blended overlay.
 */
export default class Intro {
	/**
	 * Sets up the class constructor
	 *
	 * @param {HTMLElement} container Dom element
	 */
	constructor( container ) {
		this.setup( container );
	}

	/**
	 * Sets up the canvas.
	 *
	 * @param {HTMLElement} container Dom element
	 */
	setup( container ) {
		this.container = container;

		// Main canvas.
		this.canvas = document.createElement( 'canvas' );
		this.ctx = this.canvas.getContext( '2d' );
		this.canvas.className = 'intro-grid';
		this.container.appendChild( this.canvas );

		this.resizeCanvas = document.createElement( 'canvas' );
		this.resizeCtx = this.resizeCanvas.getContext( '2d' );

		// Canvas to render the image grid.
		this.gridCanvas = document.createElement( 'canvas' );
		this.gridCtx = this.gridCanvas.getContext( '2d' );

		// Canvas to the image grid once it's done animating.
		this.cachedGridCanvas = document.createElement( 'canvas' );
		this.cachedGridCtx = this.cachedGridCanvas.getContext( '2d' );

		// Canvas to render the color gradient.
		this.gradientCanvas = document.createElement( 'canvas' );
		this.gradientCtx = this.gradientCanvas.getContext( '2d' );

		const { location } = window;
		this.origin = location.origin;

		this.setCanvasDimensions();
		this.grid = this.calcGrid();

		this.theme = document.body.getAttribute( 'data-theme' );
		this.deviceSize = this.getDeviceSize();
		this.orientation = this.canvas.width > this.canvas.height ? 'landscape' : 'portrait';
		this.sceneImgs = {};
		this.isGridCached = false;
		this.lastTime = performance.now();
		this.timeElapsed = 0;

		// Color gradient properties.
		this.colors = GRADIENT_COLORS;
		this.animate = true;
		this.step = 0;
		this.colorIndices = [ 0, 1, 2, 3 ];
		this.gradientSpeed = this.theme === 'dark' ? 0.9 : 0.6;

		this.ctx.imageSmoothingQuality = 'high';

		this.gridAssets = [];

		this.setupAssets();
		this.changeHandler();

		this.testtest = 0;

		this.animationFrame = window.requestAnimationFrame( () => this.draw() );
	}

	/**
	 * Get a string representation of the device size.
	 *
	 * @returns {string} Modile device size
	 */
	getDeviceSize() {
		if ( this.canvas.width > 740 ) {
			return 'tablet';
		} if ( this.canvas.width > 980 ) {
			return 'desktop';
		} if ( this.canvas.width > 1400 ) {
			return 'wide';
		}
		return 'mobile';
	}

	/**
	 * Sets all canvas dimensions.
	 */
	setCanvasDimensions() {
		this.canvas.width = this.container.getBoundingClientRect().width;
		this.canvas.height = this.container.getBoundingClientRect().height;
		this.gridCanvas.width = this.canvas.width;
		this.gridCanvas.height = this.canvas.height;
		this.cachedGridCanvas.width = this.canvas.width;
		this.cachedGridCanvas.height = this.canvas.height;
		this.gradientCanvas.width = this.canvas.width;
		this.gradientCanvas.height = this.canvas.height;
	}

	/**
	 * Loads canvas assets.
	 */
	setupAssets() {
		const totalCount = this.grid.rows * this.grid.cols;
		const shuffledGridAssets = this.constructor.shuffle( GRID_ASSETS );

		let currIndex = 0;
		while ( this.gridAssets.length < totalCount ) {
			const item = shuffledGridAssets[currIndex];
			const data = typeof item === 'string' ? { path: item } : item;
			this.gridAssets.push( data );
			if ( currIndex >= shuffledGridAssets.length ) {
				currIndex = 0;
			}
			currIndex++;
		}

		for ( let i = 0; i < this.gridAssets.length; i++ ) {
			if ( this.gridAssets[i].path ) {
				const pathParts = this.gridAssets[i].path.split( '.' );
				if ( pathParts[pathParts.length - 1] === 'mp4' ) {
					console.log( 'loading web p' );
					this.loadVideoBlock( this.gridAssets[i] );
				} else {
					this.loadImageBlock( this.gridAssets[i] );
				}
			} else {
				this.loadComplexBlock( this.gridAssets[i] );
			}
		}

		Object.keys( CANVAS_ASSETS ).forEach( ( key ) => {
			this.sceneImgs[key] = { path: CANVAS_ASSETS[key] };

			const img = new Image();
			img.addEventListener( 'load', () => {
				this.sceneImgs[key].img = img;
			} );
			img.src = `${ this.origin }/assets/images/${ this.sceneImgs[key].path }`;
		} );
	}

	loadComplexBlock( data ) {
		data.type = 'complex';
		const loadImg = async ( path ) => new Promise( ( resolve ) => {
			const img = new Image();
			img.onload = () => resolve( img );
			img.src = `${ this.origin }/assets/images/${ path }`;
		} );

		const loadVid = async ( path ) => new Promise( ( resolve ) => {
			const vid = document.createElement( 'video' );
			vid.addEventListener( 'canplay', () => resolve( vid ) );
			vid.src = `${ this.origin }/assets/videos/${ path }`;
		} );

		Promise.all( Object.keys( data.assets ).map( ( key ) => {
			const pathParts = data.assets[key].split( '.' );

			if ( pathParts[pathParts.length - 1] === 'mp4' ) {
				console.log( 'loading web p' );
				return loadVid( data.assets[key] ).then( ( el ) => {
					data.assets[key] = el;
				} );
			}

			return loadImg( data.assets[key] ).then( ( el ) => {
				data.assets[key] = el;
			} );
		} ) ).then( () => {
			switch ( data.name ) {
			case 'video-player':
				data.instance = new VideoPlayer( this, data );
				break;

			default:
				break;
			}
		} );
	}

	loadImageBlock( data ) {
		const img = new Image();
		img.addEventListener( 'load', () => {
			data.type = 'image';
			data.canvas = document.createElement( 'canvas' );
			data.canvas.width = this.grid.itemWidth;
			data.canvas.height = this.grid.itemHeight;

			const scale = Math.min( data.canvas.width / img.width, data.canvas.height / img.height );
			const ctx = data.canvas.getContext( '2d' );

			this.resizeCanvas.width = Math.round( img.width * scale );
			this.resizeCanvas.height = Math.round( img.height * scale );
			const resizeCtx = this.resizeCanvas.getContext( '2d' );
			resizeCtx.clearRect( 0, 0, this.resizeCanvas.width, this.resizeCanvas.height );
			resizeCtx.drawImage( img, 0, 0, this.resizeCanvas.width, this.resizeCanvas.height );

			ctx.drawImage(
				this.resizeCanvas,
				0, 0,
				this.resizeCanvas.width, this.resizeCanvas.height,
				0, 0,
				data.canvas.width, data.canvas.height
			);

			data.img = data.canvas;
			data.opacity = 0;
		} );
		img.src = `${ this.origin }/assets/images/${ data.path }`;
	}

	loadVideoBlock( data ) {
		data.type = 'video';
		data.canvas = document.createElement( 'video' );
		data.resizeCanvas = document.createElement( 'video' );
		console.log( 'lading video' );
		data.canvas.addEventListener( 'canplay', () => {
			console.log( 'video can play' );
			data.canvas.autoPlay = true;
			data.canvas.loop = true;
			data.canvas.muted = true;
			data.canvas.play();
		} );
		data.canvas.src = `${ this.origin }/assets/videos/${ data.path }`;
	}

	/**
	 * Determines the amount of rows, columns, gutters, and item sizes.
	 *
	 * @returns {object} Grid properties
	 */
	calcGrid() {
		let cols;

		if ( this.canvas.width < 480 ) {
			cols = 2;
		} else if ( this.canvas.width < 1400 ) {
			cols = 3;
		} else if ( this.canvas.width < 1800 ) {
			cols = 4;
		} else {
			cols = 5;
		}

		const gutter = 5;
		// We do columns minus 2 because there is no gutter on the outer edges.
		const xGutterTotal = ( cols - 2 ) * gutter;
		const itemWidth = Math.round( ( this.canvas.width - xGutterTotal ) / cols );
		const idealHeight = Math.round( itemWidth / ( 420 / 250 ) );

		let heightCounter = 0;
		let rows = 0;
		while ( heightCounter < this.canvas.height ) {
			heightCounter += idealHeight + gutter;
			rows++;
		}

		const difference = heightCounter - this.canvas.height - gutter;
		const cropHeight = ( difference - ( rows * gutter ) ) / rows;
		const itemHeight = Math.round( idealHeight - cropHeight );

		return {
			cols,
			rows,
			itemWidth,
			itemHeight,
			cropX: 0,
			cropY: 0,
			gutter
		};
	}

	resizeVideo( video ) {
		const resizeCtx = this.resizeCanvas.getContext( '2d' );
		const scale = Math.min( this.grid.itemWidth / video.width, this.grid.itemHeight / video.height );
		this.resizeCanvas.width = video.width * scale;
		this.resizeCanvas.height = video.height * scale;
		resizeCtx.drawImage( video, 0, 0, video.width * scale, video.height * scale );
		return this.resizeCanvas;
	}

	/**
	 * Draws the image grid.
	 */
	drawGrid() {
		this.gridCtx.clearRect( 0, 0, this.gridCtx.width, this.gridCtx.height );

		let y = 0;
		let x = 0;
		let loopCounter = 0;
		let imgCounter = 0;

		for ( let rows = 0; rows < this.grid.rows; rows++ ) {
			for ( let cols = 0; cols < this.grid.cols; cols++ ) {
				const blockData = this.gridAssets[loopCounter];

				// We will save the block's cordinates so that we can cache the grid and only redraw non-static blocks.
				blockData.x = x;
				blockData.y = y;

				switch ( blockData.type ) {
				case 'image':
					if ( !blockData.canvas ) {
						break;
					}
					this.gridCtx.drawImage( blockData.canvas, x, y, this.grid.itemWidth, this.grid.itemHeight );
					imgCounter++;
					break;

				case 'video':
					if ( !blockData.video ) {
						break;
					}
					const resizeVideo = this.resizeVideo( blockData.video );

					this.gridCtx.drawImage(
						resizeVideo,
						0, 0,
						resizeVideo.width, resizeVideo.height,
						x, y,
						this.grid.itemWidth, this.grid.itemHeight
					);
					break;

				case 'complex':
					if ( !blockData.instance ) {
						break;
					}
					this.gridCtx.drawImage( blockData.instance.canvas, x, y, this.grid.itemWidth, this.grid.itemHeight );
					break;

				default:
					break;
				}

				if ( blockData.instance ) {
					this.gridCtx.drawImage( blockData.instance.canvas, x, y, this.grid.itemWidth, this.grid.itemHeight );
				} else if ( blockData.canvas ) {
					this.gridCtx.drawImage( blockData.canvas, x, y, this.grid.itemWidth, this.grid.itemHeight );
				}

				this.gridCtx.globalAlpha = 1;
				x += this.grid.itemWidth + this.grid.gutter;
				loopCounter++;
			}
			y += this.grid.itemHeight + this.grid.gutter;
			x = 0;
		}

		if ( imgCounter === this.gridAssets.filter( ( block ) => block.type === 'image' ).length ) {
			this.isGridCached = true;
		}
	}

	/**
	 * Draws the gradient with a blending mode over the grid.
	 */
	drawGridColors() {
		const defaultCompOp = this.ctx.globalCompositeOperation;

		const colors = this.getGradientColors();

		// Clear the gradient canvas.
		this.gradientCtx.clearRect( 0, 0, this.gradientCtx.width, this.gradientCtx.height );

		// Draw the grid image so that it can be used as mask when drawing the gradient.
		this.gradientCtx.drawImage(
			this.gridCanvas,
			0,
			0,
			this.gridCanvas.width,
			this.gridCanvas.height
		);
		this.gradientCtx.globalCompositeOperation = 'source-in';

		// Draw the gradient.
		const linearGradient = this.gradientCtx.createLinearGradient(
			0,
			0,
			this.gradientCanvas.width,
			this.gradientCanvas.height
		);
		linearGradient.addColorStop( 0, `rgb( ${ colors[0].r }, ${ colors[0].g }, ${ colors[0].b } )` );
		linearGradient.addColorStop( 1, `rgb( ${ colors[1].r }, ${ colors[1].g }, ${ colors[1].b } )` );
		this.gradientCtx.fillStyle = linearGradient;
		this.gradientCtx.fillRect( 0, 0, this.gradientCanvas.width, this.gradientCanvas.height );

		// Reset gradient properties on the grid canvas.
		this.gradientCtx.globalCompositeOperation = defaultCompOp;

		// Draw the gradient canvas onto the grid canvas using a blending mode.
		this.gridCtx.globalCompositeOperation = this.theme === 'light' ? 'multiply' : 'overlay';
		this.gridCtx.globalAlpha = this.theme === 'light' ? 0.6 : 0.75;
		this.gridCtx.drawImage(
			this.gradientCanvas,
			0,
			0,
			this.gradientCanvas.width,
			this.gradientCanvas.height
		);

		// Reset global properties on the grid canvas.
		this.gridCtx.globalCompositeOperation = defaultCompOp;
		this.gridCtx.globalAlpha = 1;
	}

	/**
	 * Draws the light screen.
	 */
	drawLightScene() {
		if ( this.sceneImgs.topLeftMask && this.sceneImgs.topLeftMask.img && this.sceneImgs.bottomRightMask && this.sceneImgs.bottomRightMask.img ) {
			const defaultCompOp = this.ctx.globalCompositeOperation;

			const topLeftMask = this.sceneImgs.topLeftMask.img;
			const topLeftWidthPercent = this.deviceSize === 'mobile' ? 90 : 80;
			const topLeftMaskWidth = topLeftWidthPercent / 100 * this.canvas.width;
			this.ctx.drawImage(
				topLeftMask,
				0,
				0,
				topLeftMaskWidth,
				Math.round( topLeftMaskWidth / ( topLeftMask.width / topLeftMask.height ) )
			);

			const btmRightMask = this.sceneImgs.bottomRightMask.img;
			const btmRightWidthPercent = this.deviceSize === 'mobile' ? 100 : 90;
			const btmRightMaskWidth = btmRightWidthPercent / 100 * this.canvas.width;
			const btmRightMaskHeight = Math.round( btmRightMaskWidth / ( btmRightMask.width / btmRightMask.height ) );

			this.ctx.drawImage(
				btmRightMask,
				this.canvas.width - btmRightMaskWidth,
				this.canvas.height - btmRightMaskHeight,
				btmRightMaskWidth,
				btmRightMaskHeight
			);

			this.ctx.globalCompositeOperation = 'source-in';

			this.ctx.drawImage( this.gridCanvas, 0, 0 );

			this.ctx.globalCompositeOperation = defaultCompOp;
		}
	}

	/**
	 * Draws the dark screen.
	 */
	drawDarkScene() {
		if ( this.sceneImgs['dark-intro-left-bg.png'] && this.sceneImgs['dark-intro-right-bg.png'] ) {
			this.ctx.drawImage( this.gridCanvas, 0, 0 );

			this.ctx.globalAlpha = 0.6;

			const leftBg = this.sceneImgs['dark-intro-left-bg.png'].img;
			const leftBgHeight = ( 90 / 100 ) * this.canvas.height;
			const leftBgWidth = Math.round( leftBgHeight / ( leftBg.height / leftBg.width ) );
			this.ctx.drawImage(
				leftBg,
				0,
				( this.canvas.height - leftBgHeight ) / 2,
				leftBgWidth,
				leftBgHeight
			);

			const rightBg = this.sceneImgs['dark-intro-right-bg.png'].img;
			const rightBgHeight = ( 90 / 100 ) * this.canvas.height;
			const rightBgWidth = Math.round( rightBgHeight / ( rightBg.height / rightBg.width ) );
			this.ctx.drawImage(
				rightBg,
				this.canvas.width - rightBgWidth,
				( this.canvas.height - rightBgHeight ) / 2,
				rightBgWidth,
				rightBgHeight
			);

			this.ctx.globalAlpha = 1;

			this.ctx.fillStyle = 'rgba( 0, 0, 0, .65 )';
			this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );
		}
	}

	/**
	 * Draw the main canvas.
	 */
	draw() {
		this.timeElapsed = performance.now() - this.lastTime;
		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		const test = this.ctx.globalCompositeOperation;

		this.drawGrid();
		this.drawGridColors();

		if ( this.theme === 'dark' ) {
			this.drawLightScene();
		} else {
			this.drawLightScene();
		}

		// this.drawLightScene();
		// this.ctx.drawImage( this.gridCanvas, 0, 0 );

		this.ctx.globalCompositeOperation = test;
		this.lastTime = performance.now();
		this.animationFrame = window.requestAnimationFrame( () => this.draw() );
	}

	/**
	 * Handles when the canvas changes and needs reset.
	 */
	changeHandler() {
		const onChange = () => {
			window.cancelAnimationFrame( this.animationFrame );
			this.theme = document.body.getAttribute( 'data-theme' );
			this.deviceSize = this.getDeviceSize();
			this.orientation = this.canvas.width > this.canvas.height ? 'landscape' : 'portrait';
			this.gridAssets = [];
			this.sceneImgs = {};
			this.isGridCached = false;
			this.setCanvasDimensions();
			this.grid = this.calcGrid();
			this.setupAssets();
			this.cachedGridCtx.clearRect( 0, 0, this.cachedGridCtx, this.cachedGridCtx );
			this.animationFrame = window.requestAnimationFrame( () => this.draw() );
		};

		window.addEventListener( 'resize', onChange );
		document.body.addEventListener( 'themeChangeEvent', onChange );
	}

	/**
	 * Gets the next step in a gradient animation.
	 *
	 * @returns An array of two rgb value arrays.
	 */
	getGradientColors() {
		const innerColor = this.constructor.hexToRgb( this.colors[this.colorIndices[0]] );
		const innerColorNext = this.constructor.hexToRgb( this.colors[this.colorIndices[1]] );
		const outerColor = this.constructor.hexToRgb( this.colors[this.colorIndices[2]] );
		const outerColorNext = this.constructor.hexToRgb( this.colors[this.colorIndices[3]] );
		this.step += Number( `.00${ this.gradientSpeed.toString().substring( 2 ) }` );
		const stepDifference = 1 - this.step;

		const colors = [
			{
				r: Math.round( ( stepDifference * innerColor[0] ) + ( this.step * innerColorNext[0] ) ),
				g: Math.round( ( stepDifference * innerColor[1] ) + ( this.step * innerColorNext[1] ) ),
				b: Math.round( ( stepDifference * innerColor[2] ) + ( this.step * innerColorNext[2] ) )
			},
			{
				r: Math.round( stepDifference * outerColor[0] + this.step * outerColorNext[0] ),
				g: Math.round( stepDifference * outerColor[1] + this.step * outerColorNext[1] ),
				b: Math.round( stepDifference * outerColor[2] + this.step * outerColorNext[2] )
			}
		];

		if ( this.step >= 1 ) {
			this.step %= 1;
			const [ , indice1, , indice3 ] = this.colorIndices;
			const { length } = this.colors;
			this.colorIndices[0] = indice1;
			this.colorIndices[2] = indice3;

			this.colorIndices[1] = ( indice1 + Math.floor( 1 + Math.random() * ( length - 1 ) ) ) % length;
			this.colorIndices[3] = ( indice3 + Math.floor( 1 + Math.random() * ( length - 1 ) ) ) % length;
		}

		return colors;
	}

	static shuffle( array ) {
		let currentIndex = array.length;
		let randomIndex;

		// While there remain elements to shuffle.
		while ( currentIndex !== 0 ) {
			// Pick a remaining element.
			randomIndex = Math.floor( Math.random() * currentIndex );
			currentIndex--;

			// And swap it with the current element.
			[ array[currentIndex], array[randomIndex] ] = [
				array[randomIndex], array[currentIndex] ];
		}

		return array;
	}

	/**
	 * Converts a hex value to rgb within an array.
	 *
	 * @param {string} hex Hex value with preceeding #
	 * @returns {array}
	 */
	static hexToRgb( hex ) {
		return [
			parseInt( hex.slice( 1, 3 ), 16 ),
			parseInt( hex.slice( 3, 5 ), 16 ),
			parseInt( hex.slice( 5, 7 ), 16 )
		];
	}
}
