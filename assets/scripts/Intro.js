const gridImages = [
	'content/snopes/intro-thumb.png',
	'content/aion-launch/intro-thumb.png',
	'content/blade-and-soul-teaser/intro-thumb.png',
	'content/guildwars2-launch/intro-thumb.png',
	'content/lineage2-goddess-of-destruction/intro-thumb.png',
	'content/lineage2-goddess-of-destruction/intro-thumb-2.png',
	'content/ncsoft-redesign/intro-thumb.png',
	'content/tv-tropes/intro-thumb.png',
	'content/ad-tech-video-player/intro-thumb.png',
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

const sceneImages = [
	'light-intro-top-left-mask.png',
	'light-intro-btm-right-mask.png',
	'dark-intro-left-bg.png',
	'dark-intro-right-bg.png'
];

const gradientColors = [
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
		this.colors = gradientColors;
		this.animate = true;
		this.step = 0;
		this.colorIndices = [ 0, 1, 2, 3 ];
		this.gradientSpeed = this.theme === 'dark' ? 0.9 : 0.6;

		this.setupImgs();
		this.changeHandler();

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
	 * Loads canvas images.
	 */
	setupImgs() {
		this.imgs = [];
		const totalCount = this.grid.rows * this.grid.cols;
		while ( this.imgs.length < totalCount ) {
			this.imgs.push( ...gridImages.slice(
				0,
				totalCount >= gridImages.length ? gridImages.length : totalCount - gridImages.length
			) );
		}

		const indexes = [ ...Array( this.imgs.length ).keys() ].map( ( n ) => ++n );
		for ( let i = 0; i < this.imgs.length; i++ ) {
			this.loadImg( this.imgs[i], 'grid', i, this.onImgLoaded.bind( this ) );

			const sortaRandomIndexes = indexes.sort( () => 0.5 - Math.random() );
			this.imgs[i] = { order: sortaRandomIndexes.splice( 0, 1 )[0] };
		}

		for ( let i = 0; i < sceneImages.length; i++ ) {
			this.loadImg( sceneImages[i], 'scene', i, this.onImgLoaded.bind( this ) );
		}
	}

	/**
	 * Loads an image.
	 *
	 * @param {string} path Relative image path
	 * @param {string} type Type of image scene or template
	 * @param {Number} index The image index from this.imgs
	 * @param {function} cb Callback
	 */
	loadImg( path, type, index, cb ) {
		const img = new Image();
		img.addEventListener( 'load', () => cb( type, path, index, img ) );
		img.src = `${ this.origin }/assets/images/${ path }`;
	}

	/**
	 * On image loaded.
	 *
	 * @param {string} type Type of image scene or template
	 * @param {string} path Relative image path
	 * @param {Number} index Image index from this.imgs
	 * @param {HTMLImageElement} img Loaded image
	 * @returns {void}
	 */
	onImgLoaded( type, path, index, img ) {
		if ( type === 'scene' ) {
			this.sceneImgs[path] = { img };
			return;
		}

		this.imgs[index].img = img;
		this.imgs[index].path = path;
		this.imgs[index].opacity = 0;
	}

	/**
	 * Resizes an image.
	 *
	 * @param {HTMLImageElement} img Image being resized
	 * @param {null|Number} width Resize width
	 * @param {null|Number} height Resize height
	 *
	 * @returns {HTMLCanvasElement} Resized image on a canvas
	 */
	resizeImage( img, width = null, height = null ) {
		if ( !this.imageResizeCanvas ) {
			this.imageResizeCanvas = document.createElement( 'canvas' );
			this.imageResizeCtx = this.imageResizeCanvas.getContext( '2d' );
		}

		const ratio = width ? Math.min( width / img.width, 1 ) : Math.min( 1, height / img.height );
		this.imageResizeCanvas.width = img.width * ratio;
		this.imageResizeCanvas.height = img.height * ratio;
		this.imageResizeCtx.clearRect(
			0,
			0,
			this.imageResizeCanvas.width,
			this.imageResizeCanvas.height
		);
		this.imageResizeCtx.drawImage(
			img,
			0,
			0,
			this.imageResizeCanvas.width,
			this.imageResizeCanvas.height
		);

		return this.imageResizeCanvas;
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

	/**
	 * Draws the image grid.
	 */
	drawGrid() {
		if ( this.isGridCached ) {
			this.gridCtx.drawImage( this.cachedGridCanvas, this.cachedGridCanvas.width, this.cachedGridCanvas.height );
			return;
		}

		this.gridCtx.clearRect( 0, 0, this.gridCtx.width, this.gridCtx.height );

		let y = 0;
		let x = 0;
		let counter = 1;
		let isAnimating = false;

		const getImgData = () => this.imgs.find( ( i ) => i.order === counter );

		for ( let rows = 0; rows < this.grid.rows; rows++ ) {
			for ( let cols = 0; cols < this.grid.cols; cols++ ) {
				const imgData = getImgData();

				if ( imgData.img ) {
					if ( imgData.opacity < 1 ) {
						// imgData.opacity += this.timeElapsed / 500;
						// this.gridCtx.globalAlpha = imgData.opacity;
						isAnimating = true;
					}

					this.gridCtx.fillStyle = 'red';
					this.gridCtx.fillRect( x, y, this.grid.itemWidth, this.grid.itemHeight );

					this.gridCtx.drawImage(
						imgData.img,
						x, y, this.grid.itemWidth, this.grid.itemHeight
					);
				} else {
					isAnimating = true;
				}

				this.gridCtx.globalAlpha = 1;

				x += this.grid.itemWidth + this.grid.gutter;
				counter++;
			}
			y += this.grid.itemHeight + this.grid.gutter;
			x = 0;
		}

		if ( !isAnimating ) {
			this.cachedGridCtx.drawImage( this.gridCanvas, this.gridCanvas.width, this.gridCanvasHeight );
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
		this.gridCtx.globalCompositeOperation = 'multiply';
		this.gridCtx.globalAlpha = this.theme === 'light' ? 0.7 : 0.75;
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
		if ( this.sceneImgs['light-intro-top-left-mask.png'] && this.sceneImgs['light-intro-btm-right-mask.png'] ) {
			const defaultCompOp = this.ctx.globalCompositeOperation;

			const topLeftMask = this.sceneImgs['light-intro-top-left-mask.png'].img;
			const topLeftWidthPercent = this.deviceSize === 'mobile' ? 90 : 80;
			const topLeftMaskWidth = topLeftWidthPercent / 100 * this.canvas.width;
			this.ctx.drawImage(
				topLeftMask,
				0,
				0,
				topLeftMaskWidth,
				Math.round( topLeftMaskWidth / ( topLeftMask.width / topLeftMask.height ) )
			);

			const btmRightMask = this.sceneImgs['light-intro-btm-right-mask.png'].img;
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

			this.ctx.globalAlpha = this.deviceSize === 'mobile' || this.deviceSize === 'tablet' ? 0.4 : 0.55;

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

			const opacity = this.deviceSize === 'mobile' || this.deviceSize === 'tablet' ? 0.5 : 0.65;
			this.ctx.fillStyle = `rgba( 0, 0, 0, ${ opacity } )`;
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
			this.drawDarkScene();
		} else {
			this.drawLightScene();
		}

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
			this.imgs = [];
			this.sceneImgs = {};
			this.isGridCached = false;
			this.setCanvasDimensions();
			this.grid = this.calcGrid();
			this.setupImgs();
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
