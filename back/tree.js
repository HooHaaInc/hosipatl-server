/* Match */
//TODO: no dejar modificar si el padre ya esta avanzado, o dejar modificar
//siempre que el resultado sea el mismo
function Match(data, dad){
        if(data){
            this.a = data.a;
            this.b = data.b;
            this.ascore = data.ascore || 0;
            this.bscore = data.bscore || 0;
            this.winscore = data.winscore || 2;
        }else{
            this.ascore = 0;
            this.bscore = 0;
            this.winscore = 2;
        }
        if(dad)
            dad.addChild(this);
        this.children = new Array(2);
}

Match.prototype.addChild = function(child, index, d){
    if(index > -1){
        if(this.children[index] != undefined)
            return false;
        this.children[index] = child;
    }else if(this.children[0] == undefined)
        this.children[0] = child;
    else if(this.children[1] == undefined)
        this.children[1] = child;
    else return false;
    if(arguments.length <3 || d)
        child.dad = this;
    //if not instance of WMatch throw shit
    else child.mom = this;
    return true;
}

Match.prototype.adopt = function(child, dIndex, mother, mIndex){
    this.addChild(child, dIndex || -1);
    if(arguments.length >= 3){
        if( !(child instanceof WMatch) )
            throw "Adopting error: child is not WMatch"
        mother.addChild(child, mIndex || -1, false);
    }
}

Match.prototype.setScores = function(asc, bsc){
    if( asc > this.winscore || asc <0 || bsc > this.winscore || bsc <0 ||
        asc == this.ascore || bsc == this.bscore)
        return 0;
    if(this.dad.isDone()){
        var w = this.ascore == this.winscore ? 1 
                : this.bscore == this.winscore ? -1 : 0;
        var nw = asc == this.winscore ? 1 : bsc == this.winscore ? -1 : 0;
        if(w != nw)
            return 0;
    }
    var wasDone = this.isDone();
    this.ascore = asc;
    this.bscore = bsc;
    wasDone = wasDone && !this.isDone();
    if(this.ascore == this.winscore){
        this.win("a");
        return 1; //ascend;
    }if(this.bscore == this.winscore){
        this.win("b");
        return 1;
    }if(wasDone){
        this.win(-1);
        return -1; //descend;
    }
    return 0;
}

Match.prototype.win = function(who){
    if(who == -1){
        this.dad.resetData();
        if(this.dad.isIncomplete())
            this.dad.win(-1);
    }else{
        var i = this.dad.children.indexOf(this) == 0 ? "a" : "b";
        this.dad[i] = this[who];
        if(this.dad.isIncomplete())
            this.dad.win(i)
    }
}

Match.prototype.isIncomplete = function(){
    return (!this.a && !this.children[0]) || (!this.b && !this.children[1])
}

Match.prototype.isDone = function(){
    return this.ascore == this.wscore || this.bscore == this.wscore;
}

Match.prototype.resetData = function(){
    this.a = undefined;
    this.b = undefined;
    this.ascore = 0;
    this.bscore = 0;
}

Match.prototype.passHerency = function(){
    this.children[0].a = this.a;
    this.children[1].a = this.b;
    this.a = undefined;
    this.b = undefined;
}

/** WMatch */

function WMatch(data, dad, mom){
    Match.call(this, data, dad);
    if(mom) mom.addChild(this, -1, false);
}

WMatch.prototype = new Match();

WMatch.prototype.win = function(who){
    Match.prototype.win.call(this, who);
    if(who == -1){
        this.mom.resetData();
        if(this.mom.isIncomplete())
            this.mom.win(-1);
    }else{
        var i = this.mom.children.indexOf(this) == 0 ? "a" : "b";
        this.mom[i] = this[who == "a" ? "b" : "a"];
        if(this.mom.isIncomplete())
            this.mom.win(i);
    }
}

WMatch.prototype.setScores = function(asc, bsc){
    if( asc > this.winscore || asc <0 || bsc > this.winscore || bsc <0 ||
        asc == this.ascore || bsc == this.bscore)
        return 0;
    if(this.mom.isDone()){
        var w = this.ascore == this.winscore ? 1 
                : this.bscore == this.winscore ? -1 : 0;
        var nw = asc == this.winscore ? 1 : bsc == this.winscore ? -1 : 0;
        if(w != nw)
            return 0;
    }
    Match.prototype.setScores.call(this, asc, bsc);
}

/** Tree */

function Tree(){ 
    this.size = 0 
    this.grandfinal = new Match();
    //losers final
    this.grandfinal.adopt(new Match(), 1);
    this.lBorder = [this.grandfinal.children[1]];
    //winners final
    this.grandfinal.adopt(new WMatch(), 0, this.grandfinal.children[1], 0);
    this.wBorder = [this.grandfinal.children[0]]
    //caddr
    this.caddr = [{m: this.wBorder[0], i: "a"}, {m: this.wBorder[0], i:"b"}]
    //metadata
    this.nextCaddr = 0;
    this.caddrSize = 2;
    //if false, does it reversed because pop()
    this.inverseGeneration = false;
}
//losers final

Tree.prototype.remakeCaddr = function(cadr){
    if(cadr[0].length == 1 && cadr[1].length == 1){
        var m = cadr[0].pop();
        cadr[0].push({m: m, i: "a"}, {m: m, i: "b"});
        var m = cadr[1].pop();
        cadr[1].push({m: m, i: "a"}, {m: m, i: "b"});
        return;
    }
    cadr[0] = [cadr[0].slice(0, Math.floor(cadr[0].length/2)),
            cadr[0].slice(Math.floor(cadr[0].length/2), cadr[0].length)]
    cadr[1] = [cadr[1].slice(0, Math.floor(cadr[1].length/2)),
            cadr[1].slice(Math.floor(cadr[1].length/2), cadr[1].length)]
    this.remakeCaddr(cadr[0]);
    this.remakeCaddr(cadr[1])
}

Tree.prototype.addPlayer = function(player){
    ++this.size;
    if(this.nextCaddr++ >= this.caddrSize){
        var mothers = new Array();
        for (var index in this.lBorder){
            if(this.lBorder.hasOwnProperty(index)){
                var match = this.lBorder[index];
                var child = new Match();
                match.addChild(child);
                child.addChild(new Match())
                child.addChild(new Match())
                mothers.push(child.children[0], child.children[1]);
            }
        }
        this.lBorder = mothers.slice();
        if(this.inverseGeneration) mothers = mothers.reverse();
        this.inverseGeneration = !this.inverseGeneration;
        var wbrdr = new Array();
        for (var index in this.wBorder) {
            if(this.wBorder.hasOwnProperty(index)){
                var match = this.wBorder[index];
                match.adopt(new WMatch(), 0, mothers.pop(), 0);
                match.adopt(new WMatch(), 1, mothers.pop(), 0);
                match.passHerency();
                wbrdr.push(match.children[0], match.children[1]);
            }
        }
        this.wBorder = wbrdr;
        this.caddr = [wbrdr.slice(0, Math.floor(wbrdr.length/2)),
                wbrdr.slice(Math.floor(wbrdr.length/2), wbrdr.length)];
        this.remakeCaddr(this.caddr);
        this.caddrSize *= 2;
    }
    
    var i = this.nextCaddr-1;
    var cadr = this.caddr;
    while(cadr[0] instanceof Array){
        cadr = cadr[i%2];
        i = Math.floor(i/2);
    }
    var match = cadr[i];
    match.m[match.i] = player;

}

Tree.prototype.start = function(){
    for (var key in this.wBorder) {
        if (this.wBorder.hasOwnProperty(key)) {
            var match = this.wBorder[key];
            if(match.isIncomplete())
                match.win(match.a ? "a" : "b");
        }
    }
}

function tests(){
    var tree = new Tree();
    
    var gf = tree.grandfinal;
    var wf = gf.children[0];
    var lf = gf.children[1];
    // Init tests
    console.assert(wf.dad == gf, "winners final bad linked with grandfinal");
    console.assert(wf.mom == lf, "winners final bad linked with losers final");
    console.assert(lf.dad == gf, "losers final bad linked with grand final");
    console.assert(tree.wBorder.length == 1 && tree.wBorder[0] == wf,
        "bad winners border");
    console.assert(tree.lBorder.length == 1 && tree.lBorder[0] == lf,
        "bad losers border");
    console.assert(tree.caddr.length == 2 && tree.caddr[0].m == wf &&
            tree.caddr[1].m == wf, "bad caddr");
    
    //add Player tests
    tree.addPlayer("Nan");
    console.assert(wf.a == "Nan", "bad player addition");
    tree.addPlayer("Non");
    console.assert(wf.b == "Non", "bad player addition");
    
    //expand tree tests
    tree.addPlayer("Nein");
    var wc1 = wf.children[0];
    var wc2 = wf.children[1];
    var lc = lf.children[1];
    var lc1 = lc.children[0];
    var lc2 = lc.children[1];
    //links
    console.assert(wc1.dad == wf && wc2.dad == wf,
        "bad winners child links");
    console.assert(lc.dad = lf, "bad losers child link");
    console.assert(lc1.dad == lc && lc2.dad == lc, "bad losers grandkids link")
    console.assert(wc1.mom == lc2 && wc2.mom == lc1, "bad wc.mom")
    console.assert(lc1.children[0] == wc2 && lc2.children[0] == wc1,
        "bad lc.child");
    //data
    console.assert(wf.a == undefined && wf.b == undefined,
        "wf data not null");
    console.assert(wc1.a == "Nan", "bad Nan");
    console.assert(wc1.b == "Nein", "bad Nein");
    console.assert(wc2.a == "Non", "bad Non");
    //borders
    console.assert(tree.wBorder.length == 2 && tree.wBorder[0] == wc1 &&
        tree.wBorder[1] == wc2, "bad winners border");
    console.assert(tree.lBorder.length == 2 && tree.lBorder[0] == lc1 &&
        tree.lBorder[1] == lc2, "bad losers border");
    //caddr
    console.assert(tree.caddr.length == 2 
        && tree.caddr[0].length == 2
        && tree.caddr[1].length == 2
        && tree.caddr[0][0].m == wc1
        && tree.caddr[0][1].m == wc1
        && tree.caddr[1][0].m == wc2
        && tree.caddr[1][1].m == wc2, "bad caddr");
        
    //3rd level tests
    tree.addPlayer("Nand");
    console.assert(wc2.b = "Nand", "bad Nand");
    tree.addPlayer("Nil");
    var wc11 = wc1.children[0];
    var wc12 = wc1.children[1];
    var wc21 = wc2.children[0];
    var wc22 = wc2.children[1];
    var lc10 = lc1.children[1];
    var lc20 = lc2.children[1];
    var lc11 = lc10.children[0];
    var lc12 = lc10.children[1];
    var lc21 = lc20.children[0];
    var lc22 = lc20.children[1];
    //link
    console.assert(wc11.dad == wc1);
    console.assert(wc12.dad == wc1);
    console.assert(wc21.dad == wc2);
    console.assert(wc22.dad == wc2);
    console.assert(wc11.mom == lc11);
    console.assert(lc11.children[0] == wc11);
    console.assert(wc12.mom == lc12);
    console.assert(lc12.children[0] == wc12);
    console.assert(wc21.mom == lc21);
    console.assert(lc21.children[0] == wc21);
    console.assert(wc22.mom == lc22);
    console.assert(lc22.children[0] == wc22);
    console.assert(lc10.dad == lc1);
    console.assert(lc20.dad == lc2);
    console.assert(lc11.dad == lc10);
    console.assert(lc12.dad == lc10);
    console.assert(lc21.dad == lc20);
    console.assert(lc22.dad == lc20);
    //data
    console.assert(wc11.a == "Nan");
    console.assert(wc11.b == "Nil");
    console.assert(wc12.a == "Nein");
    console.assert(wc12.b == undefined);
    console.assert(wc21.a == "Non");
    console.assert(wc21.b == undefined);
    console.assert(wc22.a == "Nand");
    console.assert(wc22.b == undefined);
    console.assert(wc1.a == undefined);
    console.assert(wc1.b == undefined);
    console.assert(wc2.a == undefined);
    console.assert(wc2.b == undefined);
    //borders
    console.assert(tree.wBorder.length == 4);
    console.assert(tree.wBorder[0] == wc11);
    console.assert(tree.wBorder[1] == wc12);
    console.assert(tree.wBorder[2] == wc21);
    console.assert(tree.wBorder[3] == wc22);
    console.assert(tree.lBorder.length == 4);
    console.assert(tree.lBorder[0] == lc11);
    console.assert(tree.lBorder[1] == lc12);
    console.assert(tree.lBorder[2] == lc21);
    console.assert(tree.lBorder[3] == lc22);
    //caddr
    console.assert(tree.caddr.length == 2);
    console.assert(tree.caddr[0].length == 2);
    console.assert(tree.caddr[1].length == 2);
    console.assert(tree.caddr[0][0].length == 2);
    console.assert(tree.caddr[0][1].length == 2);
    console.assert(tree.caddr[1][0].length == 2);
    console.assert(tree.caddr[1][1].length == 2);
    console.assert(tree.caddr[0][0][0].m == wc11);
    console.assert(tree.caddr[0][0][1].m == wc11);
    console.assert(tree.caddr[0][1][0].m == wc12);
    console.assert(tree.caddr[0][1][1].m == wc12);
    console.assert(tree.caddr[1][0][0].m == wc21);
    console.assert(tree.caddr[1][0][1].m == wc21);
    console.assert(tree.caddr[1][1][0].m == wc22);
    console.assert(tree.caddr[1][1][1].m == wc22);
    
}