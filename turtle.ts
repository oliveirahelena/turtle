//% color="#2E8B57" icon="\uf188" block="Turtle"
namespace turtle {
    let _turtleSprite: Sprite = null;
    let _isPenDown: boolean = true;
    let _penColor: number = 1;
    let _penThickness: number = 1;
    let _currentHeading: number = 0;

    // Coordenadas da tartaruga (sistema Turtle: 0,0 no centro, Y aumenta para cima)
    let _turtleRawX: number = 0;
    let _turtleRawY: number = 0;
    let _isTurtleVisible: boolean = true;

    const ANIMATION_FRAME_DURATION = 150;
    const PIXELS_PER_STEP = 4;
    let _turtleSpeed = 6;

    // --- Arte da Tartaruga (Frames) ---
    const DIR_RIGHT = 0;
    const DIR_UP = 1;
    const DIR_LEFT = 2;
    const DIR_DOWN = 3;

    let _currentVisualDirection = DIR_RIGHT; // <<< CORREÇÃO: Padrão inicial é direita
    let _turtleIdleFrames: Image[];

    // --- IMAGENS DA TARTARUGA (APENAS IDLE) ---
    const turtle_R_idle = img`
        . . . . . . . . 7 7 . . . . . .
        . 7 7 . . . . . 7 7 7 . . . . .
        . 7 7 7 . . . . . . 7 7 . . . .
        . . 7 7 7 6 6 6 6 6 7 7 . . . .
        . . . 7 6 6 6 6 6 6 6 . . . . .
        . . . 6 6 6 6 6 6 6 6 6 . 7 7 .
        . . 7 6 6 6 6 6 6 6 6 6 7 7 7 7
        . . 7 6 6 6 6 6 6 6 6 6 7 7 7 7
        . . . 6 6 6 6 6 6 6 6 6 . 7 7 .
        . . . 7 6 6 6 6 6 6 6 . . . . .
        . . 7 7 7 6 6 6 6 6 7 7 . . . .
        . 7 7 7 . . . . . . 7 7 . . . .
        . 7 7 . . . . . 7 7 7 . . . . .
        . . . . . . . . 7 7 . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
    const turtle_L_idle = img`
        . . . . . . 7 7 . . . . . . . .
        . . . . . 7 7 7 . . . . . 7 7 .
        . . . . 7 7 . . . . . . 7 7 7 .
        . . . . 7 7 6 6 6 6 6 7 7 7 . .
        . . . . . 6 6 6 6 6 6 6 7 . . .
        . 7 7 . 6 6 6 6 6 6 6 6 6 . . .
        7 7 7 7 6 6 6 6 6 6 6 6 6 7 . .
        7 7 7 7 6 6 6 6 6 6 6 6 6 7 . .
        . 7 7 . 6 6 6 6 6 6 6 6 6 . . .
        . . . . . 6 6 6 6 6 6 6 7 . . .
        . . . . 7 7 6 6 6 6 6 7 7 7 . .
        . . . . 7 7 . . . . . . 7 7 7 .
        . . . . . 7 7 7 . . . . . 7 7 .
        . . . . . . 7 7 . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
    const turtle_U_idle = img`
        . . . . . . 7 7 . . . . . . . .
        . . . . . 7 7 7 7 . . . . . . .
        . . . . . 7 7 7 7 . . . . . . .
        . . . . . . 7 7 . . . . . . . .
        . . 7 7 . 6 6 6 6 . 7 7 . . . .
        . 7 7 7 6 6 6 6 6 6 7 7 7 . . .
        7 7 . 6 6 6 6 6 6 6 6 . 7 7 . .
        7 7 . 6 6 6 6 6 6 6 6 . 7 7 . .
        . . . 6 6 6 6 6 6 6 6 . . . . .
        . . . 6 6 6 6 6 6 6 6 . . . . .
        . . . 6 6 6 6 6 6 6 6 . . . . .
        . . . 7 6 6 6 6 6 6 7 . . . . .
        . . 7 7 7 6 6 6 6 7 7 7 . . . .
        . 7 7 7 . . 7 7 . . 7 7 7 . . .
        . 7 7 . . . . . . . . 7 7 . . .
        . . . . . . . . . . . . . . . .
    `;
    const turtle_D_idle = img`
        . . . . . . . . . . . . . . . .
        . 7 7 . . . . . . . . 7 7 . . .
        . 7 7 7 . . 7 7 . . 7 7 7 . . .
        . . 7 7 7 6 6 6 6 7 7 7 . . . .
        . . . 7 6 6 6 6 6 6 7 . . . . .
        . . . 6 6 6 6 6 6 6 6 . . . . .
        . . . 6 6 6 6 6 6 6 6 . . . . .
        . . . 6 6 6 6 6 6 6 6 . . . . .
        7 7 . 6 6 6 6 6 6 6 6 . 7 7 . .
        7 7 . 6 6 6 6 6 6 6 6 . 7 7 . .
        . 7 7 7 6 6 6 6 6 6 7 7 7 . . .
        . . 7 7 . 6 6 6 6 . 7 7 . . . .
        . . . . . . 7 7 . . . . . . . .
        . . . . . 7 7 7 7 . . . . . . .
        . . . . . 7 7 7 7 . . . . . . .
        . . . . . . 7 7 . . . . . . . .
    `;

    // --- Funções Auxiliares de Coordenadas ---
    function _turtleToScreenX(turtleX: number): number {
        return scene.screenWidth() / 2 + turtleX;
    }
    function _turtleToScreenY(turtleY: number): number {
        return scene.screenHeight() / 2 - turtleY; // Y invertido
    }

    function _initializeTurtleFrames() {
        if (!_turtleIdleFrames || !_turtleIdleFrames[0]) {
            _turtleIdleFrames = [turtle_R_idle, turtle_U_idle, turtle_L_idle, turtle_D_idle];
            const fallbackImg = image.create(16, 16); fallbackImg.fill(1); fallbackImg.drawRect(0, 0, 16, 16, 7);
            for (let i = 0; i < 4; i++) {
                if (!_turtleIdleFrames[i]) {
                    console.warn(`TURTLE: Missing idle frame for direction ${i}. Using fallback.`);
                    _turtleIdleFrames[i] = fallbackImg.clone();
                }
            }
        }
    }

    function _updateSpriteAppearance() {
        if (!_turtleSprite) return;
        _initializeTurtleFrames();

        let normalizedAngle = (_currentHeading % 360 + 360) % 360;
        if (normalizedAngle >= 315 || normalizedAngle < 45) { _currentVisualDirection = DIR_RIGHT; }
        else if (normalizedAngle >= 45 && normalizedAngle < 135) { _currentVisualDirection = DIR_UP; }
        else if (normalizedAngle >= 135 && normalizedAngle < 225) { _currentVisualDirection = DIR_LEFT; }
        else { _currentVisualDirection = DIR_DOWN; }

        if (_isTurtleVisible && _turtleIdleFrames[_currentVisualDirection]) {
            _turtleSprite.setImage(_turtleIdleFrames[_currentVisualDirection]);
            _turtleSprite.setFlag(SpriteFlag.Invisible, false);
        } else if (!_isTurtleVisible) {
            _turtleSprite.setFlag(SpriteFlag.Invisible, true);
        } else if (!_turtleIdleFrames[_currentVisualDirection]) {
            console.warn("TURTLE: Idle frame missing for current visual direction: " + _currentVisualDirection);
        }
    }

    function _ensureTurtleExists() {
        if (!_turtleSprite) {
            _initializeTurtleFrames();

            _turtleRawX = 0;
            _turtleRawY = 0;
            _currentHeading = 0; // <<< CORREÇÃO: Começa virada para a DIREITA (0 graus), padrão do Python.
            _isPenDown = true;
            _penColor = 1;
            _penThickness = 1;
            _isTurtleVisible = true;
            _turtleSpeed = 6;
            _currentVisualDirection = DIR_RIGHT; // <<< CORREÇÃO: Define a direção visual inicial para a direita.

            let initialImage = _turtleIdleFrames[_currentVisualDirection];
            if (!initialImage) {
                initialImage = image.create(16, 16); initialImage.fill(1);
                console.error("TURTLE: Critical fallback for initialImage.");
            }

            _turtleSprite = sprites.create(initialImage, SpriteKind.Player);
            _turtleSprite.setFlag(SpriteFlag.StayInScreen, true);
            _turtleSprite.setPosition(_turtleToScreenX(_turtleRawX), _turtleToScreenY(_turtleRawY));

            _updateSpriteAppearance();
        }
    }

    function _getAnimationDuration(): number {
        if (_turtleSpeed === 0) return 0;
        let duration = ANIMATION_FRAME_DURATION;
        if (_turtleSpeed >= 1 && _turtleSpeed <= 10) {
            duration = 25 + (10 - _turtleSpeed) * 25;
        } else if (_turtleSpeed > 10) {
            duration = 25;
        }
        return duration;
    }

    function _drawLineWithThickness(screenX0: number, screenY0: number, screenX1: number, screenY1: number, color: number, thickness: number) {
        if (thickness <= 1) {
            scene.backgroundImage().drawLine(Math.round(screenX0), Math.round(screenY0), Math.round(screenX1), Math.round(screenY1), color);
        } else {
            let r = Math.max(0, Math.floor((thickness - 1) / 2));
            let x0 = Math.round(screenX0);
            let y0 = Math.round(screenY0);
            let x1 = Math.round(screenX1);
            let y1 = Math.round(screenY1);

            let dx = Math.abs(x1 - x0);
            let dy = Math.abs(y1 - y0);
            let sx = (x0 < x1) ? 1 : -1;
            let sy = (y0 < y1) ? 1 : -1;
            let err = dx - dy;

            while (true) {
                scene.backgroundImage().fillCircle(x0, y0, r, color);
                if ((x0 === x1) && (y0 === y1)) break;
                let e2 = 2 * err;
                if (e2 > -dy) { err -= dy; x0 += sx; }
                if (e2 < dx) { err += dx; y0 += sy; }
            }
        }
    }

    //% block="turtle sprite"
    //% group="Turtle State" weight=30
    export function turtleSprite(): Sprite {
        _ensureTurtleExists();
        return _turtleSprite;
    }

    // --- Turtle Motion ---

    //% block="forward %distance pixels"
    //% blockAlias=fd
    //% distance.defl=50
    //% group="Movement" weight=100
    export function forward(distance: number): void {
        _ensureTurtleExists();
        const absDistance = Math.abs(distance);
        const effectiveDistance = distance;

        const radians = _currentHeading * Math.PI / 180;
        const totalDeltaX = Math.cos(radians) * effectiveDistance;
        const totalDeltaY = Math.sin(radians) * effectiveDistance;

        const animDuration = _getAnimationDuration();

        if (animDuration === 0) {
            const prevRawX = _turtleRawX;
            const prevRawY = _turtleRawY;
            _turtleRawX += totalDeltaX;
            _turtleRawY += totalDeltaY;
            if (_isPenDown) {
                _drawLineWithThickness(
                    _turtleToScreenX(prevRawX), _turtleToScreenY(prevRawY),
                    _turtleToScreenX(_turtleRawX), _turtleToScreenY(_turtleRawY),
                    _penColor, _penThickness
                );
            }
            _turtleSprite.setPosition(_turtleToScreenX(_turtleRawX), _turtleToScreenY(_turtleRawY));
        } else {
            const numAnimationSteps = Math.max(1, Math.ceil(absDistance / PIXELS_PER_STEP));
            const stepDx = totalDeltaX / numAnimationSteps;
            const stepDy = totalDeltaY / numAnimationSteps;

            for (let i = 0; i < numAnimationSteps; i++) {
                const prevRawX = _turtleRawX;
                const prevRawY = _turtleRawY;

                _turtleRawX += stepDx;
                _turtleRawY += stepDy;

                if (_isPenDown) {
                    _drawLineWithThickness(
                        _turtleToScreenX(prevRawX), _turtleToScreenY(prevRawY),
                        _turtleToScreenX(_turtleRawX), _turtleToScreenY(_turtleRawY),
                        _penColor, _penThickness
                    );
                }
                _turtleSprite.setPosition(_turtleToScreenX(_turtleRawX), _turtleToScreenY(_turtleRawY));
                if (animDuration > 0) {
                    pause(animDuration);
                }
            }
        }

        if (_isTurtleVisible) {
            _updateSpriteAppearance();
        }
    }

    //% block="fd %distance pixels"
    //% distance.defl=50
    //% group="Movement" weight=99 blockHidden=true
    export function fd(distance: number): void { forward(distance); }

    //% block="backward %distance pixels"
    //% blockAlias=bk,back
    //% distance.defl=50
    //% group="Movement" weight=90
    export function backward(distance: number): void {
        forward(-distance);
    }
    //% block="bk %distance pixels" group="Movement" weight=89 blockHidden=true
    export function bk(distance: number): void { backward(distance); }
    //% block="back %distance pixels" group="Movement" weight=88 blockHidden=true
    export function back(distance: number): void { backward(distance); }


    //% block="left %angle degrees"
    //% blockAlias=lt
    //% angle.defl=90
    //% group="Movement" weight=80
    export function left(angle: number): void {
        _ensureTurtleExists();
        _currentHeading += angle;
        _updateSpriteAppearance();
    }
    //% block="lt %angle degrees" group="Movement" weight=79 blockHidden=true
    export function lt(angle: number): void { left(angle); }

    //% block="right %angle degrees"
    //% blockAlias=rt
    //% angle.defl=90
    //% group="Movement" weight=70
    export function right(angle: number): void {
        _ensureTurtleExists();
        _currentHeading -= angle;
        _updateSpriteAppearance();
    }
    //% block="rt %angle degrees" group="Movement" weight=69 blockHidden=true
    export function rt(angle: number): void { right(angle); }

    //% block="go to x %x y %y"
    //% blockAlias=setpos,setposition
    //% x.defl=0 y.defl=0
    //% group="Movement" weight=60
    export function goto(x: number, y: number): void {
        _ensureTurtleExists();

        const prevRawX = _turtleRawX;
        const prevRawY = _turtleRawY;

        const deltaX = x - prevRawX;
        const deltaY = y - prevRawY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const animDuration = _getAnimationDuration();

        if (animDuration === 0 || distance === 0) {
            if (_isPenDown) {
                _drawLineWithThickness(
                    _turtleToScreenX(prevRawX), _turtleToScreenY(prevRawY),
                    _turtleToScreenX(x), _turtleToScreenY(y),
                    _penColor, _penThickness
                );
            }
            _turtleRawX = x;
            _turtleRawY = y;
            _turtleSprite.setPosition(_turtleToScreenX(_turtleRawX), _turtleToScreenY(_turtleRawY));
        } else {
            const numAnimationSteps = Math.max(1, Math.ceil(distance / PIXELS_PER_STEP));
            const stepDx = deltaX / numAnimationSteps;
            const stepDy = deltaY / numAnimationSteps;

            for (let i = 0; i < numAnimationSteps; i++) {
                const currentX = _turtleRawX;
                const currentY = _turtleRawY;

                _turtleRawX += stepDx;
                _turtleRawY += stepDy;

                if (_isPenDown) {
                    _drawLineWithThickness(
                        _turtleToScreenX(currentX), _turtleToScreenY(currentY),
                        _turtleToScreenX(_turtleRawX), _turtleToScreenY(_turtleRawY),
                        _penColor, _penThickness
                    );
                }
                _turtleSprite.setPosition(_turtleToScreenX(_turtleRawX), _turtleToScreenY(_turtleRawY));
                if (animDuration > 0) {
                    pause(animDuration);
                }
            }
            // Garante a posição final exata para evitar erros de arredondamento
            _turtleRawX = x;
            _turtleRawY = y;
            _turtleSprite.setPosition(_turtleToScreenX(_turtleRawX), _turtleToScreenY(_turtleRawY));
        }
    }


    //% block="set heading %to_angle degrees"
    //% blockAlias=seth
    //% to_angle.defl=0
    //% group="Movement" weight=50
    export function setheading(to_angle: number): void {
        _ensureTurtleExists();
        _currentHeading = to_angle;
        _updateSpriteAppearance();
    }
    //% block="seth %to_angle degrees" group="Movement" weight=49 blockHidden=true
    export function seth(to_angle: number): void { setheading(to_angle); }

    //% block="home"
    //% group="Movement" weight=40
    export function home(): void {
        _ensureTurtleExists();
        // <<< CORREÇÃO: home() agora chama goto() para ter animação e preservar a velocidade.
        goto(0, 0);
        setheading(0); // Aponta para a direita (0 graus) após chegar em casa.
    }

    //% block="speed %speedValue (0-10)"
    //% speedValue.min=0 speedValue.max=10 speedValue.defl=6
    //% group="Movement" weight=30
    export function speed(speedValue: number): void {
        _ensureTurtleExists();
        _turtleSpeed = Math.clamp(0, 10, Math.round(speedValue));
    }

    // --- Pen Control ---

    //% block="pen down"
    //% blockAlias=pd,down
    //% group="Pen Control" weight=100
    export function pendown(): void {
        _ensureTurtleExists();
        _isPenDown = true;
    }
    //% block="pd" group="Pen Control" weight=99 blockHidden=true
    export function pd(): void { pendown(); }
    //% block="down" group="Pen Control" weight=98 blockHidden=true
    export function down(): void { pendown(); }

    //% block="pen up"
    //% blockAlias=pu,up
    //% group="Pen Control" weight=90
    export function penup(): void {
        _ensureTurtleExists();
        _isPenDown = false;
    }
    //% block="pu" group="Pen Control" weight=89 blockHidden=true
    export function pu(): void { penup(); }
    //% block="up" group="Pen Control" weight=88 blockHidden=true
    export function up(): void { penup(); }

    //% block="pen color %color=colorindexpicker"
    //% color.defl=1
    //% group="Pen Control" weight=80
    export function pencolor(color: number): void {
        _ensureTurtleExists();
        _penColor = color;
    }

    //% block="is pen down?"
    //% group="Pen Control" weight=70
    export function isdown(): boolean {
        _ensureTurtleExists();
        return _isPenDown;
    }

    //% block="pen size %widthNum"
    //% blockAlias=width
    //% widthNum.min=1 widthNum.defl=1
    //% group="Pen Control" weight=60
    export function pensize(widthNum: number): void {
        _ensureTurtleExists();
        _penThickness = Math.max(1, Math.round(widthNum));
    }
    //% block="width %widthNum" group="Pen Control" weight=59 blockHidden=true
    export function width(w: number): void { pensize(w); }


    // --- Turtle State ---

    //% block="heading"
    //% group="Turtle State" weight=100
    export function heading(): number {
        _ensureTurtleExists();
        return (_currentHeading % 360 + 360) % 360;
    }

    //% block="position"
    //% blockAlias=pos
    //% group="Turtle State" weight=90
    export function position(): { x: number, y: number } {
        _ensureTurtleExists();
        return { x: Math.round(_turtleRawX), y: Math.round(_turtleRawY) };
    }
    //% block="pos" group="Turtle State" weight=89 blockHidden=true
    export function pos(): { x: number, y: number } { return position(); }

    //% block="x coordinate"
    //% group="Turtle State" weight=80
    export function xcor(): number {
        _ensureTurtleExists();
        return Math.round(_turtleRawX);
    }

    //% block="y coordinate"
    //% group="Turtle State" weight=70
    export function ycor(): number {
        _ensureTurtleExists();
        return Math.round(_turtleRawY);
    }

    //% block="show turtle"
    //% blockAlias=st
    //% group="Turtle State" weight=60
    export function showturtle(): void {
        _ensureTurtleExists();
        _isTurtleVisible = true;
        _updateSpriteAppearance();
    }
    //% block="st" group="Turtle State" weight=59 blockHidden=true
    export function st(): void { showturtle(); }

    //% block="hide turtle"
    //% blockAlias=ht
    //% group="Turtle State" weight=50
    export function hideturtle(): void {
        _ensureTurtleExists();
        _isTurtleVisible = false;
        if (_turtleSprite) {
            _turtleSprite.setFlag(SpriteFlag.Invisible, true);
        }
    }
    //% block="ht" group="Turtle State" weight=49 blockHidden=true
    export function ht(): void { hideturtle(); }

    //% block="is turtle visible?"
    //% group="Turtle State" weight=40
    export function isvisible(): boolean {
        _ensureTurtleExists();
        return _isTurtleVisible;
    }

    // --- Drawing Control ---
    //% block="clear drawings"
    //% group="Drawing Control" weight=100
    //% blockGap=8
    //% help=turtle/clear
    //% note="Apaga os desenhos da tartaruga da tela, mas não move a tartaruga."
    export function clear(): void {
        scene.backgroundImage().fill(scene.backgroundColor());
    }

    //% block="reset turtle"
    //% group="Drawing Control" weight=90
    //% help=turtle/reset
    //% note="Apaga os desenhos, centraliza a tartaruga e a reseta para seu estado inicial."
    export function reset(): void {
        if (_turtleSprite) {
            _turtleSprite.destroy();
            _turtleSprite = null;
        }
        scene.backgroundImage().fill(scene.backgroundColor());
        _ensureTurtleExists();
    }

    _ensureTurtleExists();
}