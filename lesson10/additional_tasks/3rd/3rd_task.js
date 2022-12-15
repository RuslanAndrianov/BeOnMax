class Options 
{
    constructor(height, width, background, fontSize, textAlign)
    {
        this.height = height;
        this.width = width;
        this.background = background;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    divCreator() 
    {
        let elem = document.createElement('div');
        elem.textContent = 'Example';
        document.body.appendChild(elem);
        elem.style.height = this.height;
        elem.style.width = this.width;
        elem.style.background = this.background;
        elem.style.fontSize = this.fontSize;
        elem.style.textAlign = this.textAlign;
    }
}

let elem = new Options('100px','100px','green','12px','center');
elem.divCreator();