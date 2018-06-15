function Clock(id){
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.font_height = 15;
    this.margin = 35;
    this.hand_tru = this.canvas.width / 25;
    this.hour_hand_tru = this.canvas.width / 10;
    this.numeral_spacing = 20;
    this.radius = this.canvas.width / 2 - this.margin;
    this.hand_radius = this.radius + this.numeral_spacing;
    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = '#fff';
    this.ctx.font = this.font_height + 'px Arial';
}
Clock.prototype.init = function(){ // 初始化
    var loop = setInterval(() => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawCircle();
        this.drawNumerals();
        this.drawCenter();
        this.drawHands();
    }, 1000);
};
Clock.prototype.drawCircle = function(){ // 绘制表盘
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.radius, 0, Math.PI * 2, true);
    this.ctx.stroke();
};
Clock.prototype.drawNumerals = function(){ // 绘制表盘刻度
    var numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        angle = 0,
        numeralWith = 0;
    var _this = this;
    numerals.forEach((numeral) => {
        angle = Math.PI / 6 * (numeral - 3);
        numeralWith = _this.ctx.measureText(numeral).width;
        _this.ctx.fillText(numeral,
            _this.canvas.width / 2 + Math.cos(angle) * _this.hand_radius - numeralWith / 2,
            _this.canvas.height / 2 + Math.sin(angle) * _this.hand_radius + _this.font_height / 2
        )
    });
};
Clock.prototype.drawCenter = function(){ // 绘制表盘圆心
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 5, 0, Math.PI * 2, true);
    this.ctx.fill();
};
Clock.prototype.drawHand = function(loc, isHour, num){ // 绘制时针
    var angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2,
        handRadius = isHour ? this.radius - this.hand_tru - this.hour_hand_tru: this.radius - this.hand_tru;
    handRadius = handRadius * num;
    this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.lineTo(this.canvas.width / 2 + Math.cos(angle) * handRadius, this.canvas.height / 2 + Math.sin(angle) * handRadius);
    this.ctx.stroke();
};
Clock.prototype.drawHands = function(){ // 绘制指针
    var date = new Date(),
        hour = date.getHours();
    hour = hour > 12 ? hour - 12: hour;
    this.drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true, 0.7);
    this.drawHand(date.getMinutes(), false, 0.8);
    this.drawHand(date.getSeconds(), false, 0.9);
};