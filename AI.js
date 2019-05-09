/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
function Site(id, x, y, type, owner, p1, p2, mg, rg)
{
    this.ID = id;
    this.X = x;
    this.Y = y;
    this.Type = type;
    this.Owner = owner;
    this.P1 = p1;
    this.P2 = p2;
    this.MG = mg;
    this.RG = rg;
    this.C = false;
}

var sites = [];

function Unit(x, y, owner, type)
{
    this.X = x;
    this.Y = y;
    this.Owner = owner;
    this.Type = type;
}

var units = [];

const numSites = parseInt(readline());
for (let i = 0; i < numSites; i++) {
    var inputs = readline().split(' ');
    const siteId = parseInt(inputs[0]);
    const x = parseInt(inputs[1]);
    const y = parseInt(inputs[2]);
    const radius = parseInt(inputs[3]);
    var newSite = new Site(siteId, x, y);
    sites.push(newSite);
}

var game = {
        returnQueen: function() {
            for (let x in units) {
                if (units[x].Type === -1 && units[x].Owner === 0) {
                    if (!queenStored) {
                        game.queenOX = units[x].X;
                        game.queenOY = units[x].Y;
                        queenStored = true;
                    }
                    return units[x];
                }
            }
        },
        
        queenOX: 0,
        
        queenOY: 0,
        
        returnClosest: function(type, gold = false) {
            var dist;
            var tSite;
            for (let i = 0; i < sites.length; i++) {
                var d = Math.hypot(queen.X - sites[i].X, queen.Y - sites[i].Y);
                //console.error(sites[i].ID + ' ' + d + ', ' + dist);
                if (dist === undefined)
                    dist = parseInt(d);
                else if (type === -1 && gold === true) {
                    if (d < dist && sites[i].Type === type && sites[i].RG > 0) {
                        dist = parseInt(d);
                        tSite = sites[i];
                        //console.error('CURRENT SITE: ' + tSite['ID']);
                    }
                } else if (type === -1 && gold === false) {
                    if (d < dist && sites[i].Type === type) {
                        dist = parseInt(d);
                        tSite = sites[i];
                        //console.error('CURRENT SITE: ' + tSite['ID']);
                    }
                } else if (type === 0) {
                    if (d < dist && sites[i].Type === type && sites[i].Owner === 0 && sites[i].MG > sites[i].P1) {
                        dist = parseInt(d);
                        tSite = sites[i];
                        //console.error('CURRENT SITE: ' + tSite['ID']);
                    }
                } else {
                    if (d < dist && sites[i].Type === type && sites[i].Owner === 0) {
                        dist = parseInt(d);
                        tSite = sites[i];
                        //console.error('CURRENT SITE: ' + tSite['ID']);
                    }
                
                }
            }
            return tSite;
        },
        
        buildBarracksClosest: function(type) {
            var t = game.returnClosest(-1, false);
            //console.error(t);
            if (t !== undefined)
                console.log(`BUILD ${t.ID} ${type}`);
            else {
                console.log('WAIT');
                console.error('buildBarracksClosest')
            }
        },
        
        buildGoldmineClosest: function(upgrade) {
            var t;
            if (!upgrade) {
                t = game.returnClosest(-1, true);
            }
            else if (upgrade) {
                t = game.returnClosest(0);
            }
            if (t !== undefined)
                    console.log(`BUILD ${t.ID} MINE`);
                else {
                    console.log('WAIT');
                    console.error('buildGoldmineClosest')
                }
        },
        
        updateBuildingsList: function() {
            game.knightLoc = [];
            game.knightsLocE = [];
            game.archerLoc = [];
            game.goldLoc = [];
            game.towerLocE = [];
            game.giantLoc = [];
            
            for (let i = 0; i < sites.length; i++) {
                if (sites[i].Type === 2 && sites[i].Owner === 0 && sites[i].P2 === 0) {
                    game.knightLoc.push(sites[i].ID);
                }
                else if (sites[i].Type === 2 && sites[i].Owner === 1 && sites[i].P2 === 0) {
                    game.knightLocE.push(sites[i].ID);
                }
                else if (sites[i].Type === 2 && sites[i].Owner === 0 && sites[i].P2 === 1) {
                    game.archerLoc.push(sites[i].ID);
                }
                else if (sites[i].Type === 0 && sites[i].Owner === 0) {
                    game.goldLoc.push(sites[i]);
                }
                else if (sites[i].Type === 1 && sites[i].Owner === 1) {
                    game.towerLocE.push(sites[i]);
                }
                else if (sites[i].Type === 1 && sites[i].Owner === 0) {
                    game.towerLoc.push(sites[i]);
                }
                else if (sites[i].Type === 2 && sites[i].Owner === 0 && sites[i].P2 === 2) {
                    game.giantLoc.push(sites[i].ID);
                }
            }
        },
        
        updateUnitsList: function() {
            game.giants = [];
            game.knights = [];
            game.archers = [];
            game.knightsE = [];
            
            for (let i = 0; i < units.length; i++) {
                if (units[i].Type === 0 & units[i].Owner === 0) {
                    game.knights.push('K');
                }
                if (units[i].Type === 0 & units[i].Owner === 1) {
                    game.knightsE.push('K');
                }
                if (units[i].Type === 1 & units[i].Owner === 0) {
                    game.archers.push('A');
                }
                if (units[i].Type === 2 & units[i].Owner === 0) {
                    game.giants.push('G');
                    giantTrained = true;
                }
            }
        },
        
        knightLoc: [],
        
        knightLocE: [],
        
        archerLoc: [],
        
        giantLoc: [],
        
        goldLoc: [],
        
        towerLoc: [],
        
        towerLocE: [],
        
        giants: [],
        
        knights: [],
        
        knightsE: [],
        
        archers: [],
        
        gold: 0,
        
        goldUpgrades: function() {
            if (game.goldLoc[0] !== undefined) {
                for (let i = 0; i < game.goldLoc.length; i++) {
                if (game.goldLoc[i].MG > game.goldLoc[i].P1)
                    return true;
                }
            }
            else return false;
        },
        
        goldViable: function() {
            for (let i = 0; i < sites.length; i++) {
                if (sites[i].RG > 0 && sites[i].Type === -1) {
                    return true;
                }
            }
            return false;
        }
    }

var giantTrained = false;
var queenStored = false;
// game loop
while (true) {
    var inputs = readline().split(' ');
    const gold = parseInt(inputs[0]);
    game.gold = gold;
    const touchedSite = parseInt(inputs[1]); // -1 if none
    for (let i = 0; i < numSites; i++) {
        var inputs = readline().split(' ');
        const siteId = parseInt(inputs[0]);
        const goldRemaining = parseInt(inputs[1]); // -1 if unknown
        const maxMineSize = parseInt(inputs[2]); // -1 if unknown
        const structureType = parseInt(inputs[3]); // -1 = No structure, 0 = Goldmine, 1 = Tower, 2 = Barracks
        const owner = parseInt(inputs[4]); // -1 = No structure, 0 = Friendly, 1 = Enemy
        const param1 = parseInt(inputs[5]);
        const param2 = parseInt(inputs[6]);
        for (let i = 0; i < sites.length; i++)
        {
            if (sites[i].ID === siteId)
            {
                //console.error(sites[i]);
                sites[i].Type = structureType;
                sites[i].Owner = owner;
                sites[i]['P1'] = param1;
                sites[i]['P2'] = param2;
                sites[i].MG = maxMineSize;
                sites[i].RG = goldRemaining;
                sites[i].C = true;
                break;
            }
        }
    }
    
    const numUnits = parseInt(readline());
    units = [];
    for (let i = 0; i < numUnits; i++) {
        var inputs = readline().split(' ');
        const x = parseInt(inputs[0]);
        const y = parseInt(inputs[1]);
        const owner = parseInt(inputs[2]);
        const unitType = parseInt(inputs[3]); // -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER, 2 = GIANT
        const health = parseInt(inputs[4]);
        var newUnit = new Unit(x, y, owner, unitType);
        units.push(newUnit);
    }
    
    // First line: A valid queen action
    // Second line: A set of training instructions
    
    var queen = game.returnQueen();
    //console.error(queen);
    game.updateBuildingsList();
    game.updateUnitsList();
    
    //AI BUILD LOGIC
    
    if (game.goldLoc.length < 2 && game.goldViable() === true)
        game.buildGoldmineClosest(false);
    else if (game.goldUpgrades() === true && game.archerLoc.length > 0)
        game.buildGoldmineClosest(true);
    else if (game.archerLoc.length < 1)
        game.buildBarracksClosest('BARRACKS-ARCHER');
    else if (game.goldLoc.length < 3 && game.archerLoc.length > 0 && game.goldViable() === true)
        game.buildGoldmineClosest(false);
    else if (game.knightLoc.length < 1) 
        game.buildBarracksClosest('BARRACKS-KNIGHT');
    else if (game.towerLoc.length === 0)
        game.buildBarracksClosest('TOWER');
    else if (game.towerLocE.length > 0 && game.giantLoc[0] === undefined)
        game.buildBarracksClosest('BARRACKS-GIANT');
    else if (game.goldLoc.length < 5 && game.archerLoc.length > 0 && game.goldViable() === true)
        game.buildGoldmineClosest(false);
    else if (game.towerLoc.length < 3)
        game.buildBarracksClosest('TOWER');
    else if (game.goldLoc.length < 8 && game.archerLoc.length > 0 && game.goldViable() === true)
        game.buildGoldmineClosest(false);
    else console.log(`MOVE ${game.queenOX} ${game.queenOY}`);
    
    //AI TRAIN LOGIC
    if (units.length < 3) {
        console.log('TRAIN');
    }
    else if (game.towerLocE[0] !== undefined && game.giantLoc[0] !== undefined && giantTrained === false) {
        var str = game.giantLoc.join(' ').trim();
        if (game.archerLoc.length > 0)
            str += ' ' + game.archerLoc.join(' ').trim();
        console.log('TRAIN ' + str)
    }
    else if (game.archerLoc[0] !== undefined && game.knightLoc[0] !== undefined && game.gold > (80 * game.knightLoc.length + 100 * game.archerLoc.length)) {
        if (game.knights.length < game.archers.length + 1) {
            var str = game.knightLoc.join(' ').trim();
        } else {
            var str = game.archerLoc.join(' ').trim();
            str += ' ' + game.knightLoc.join(' ').trim();
        }
        console.log('TRAIN ' + str);
    }
    else if (game.knightLoc[0] !== undefined && game.knightLocE.length < (game.archers.length - 2)) {
        var str = game.knightLoc.join(' ').trim();
        console.log('TRAIN ' + str);
    }
    else if (game.archerLoc[0] !== undefined && game.knightLocE.length > 0 && game.knightsE.length > (game.archers.length + 1)) {
        var str = game.archerLoc.join(' ').trim();
        console.log('TRAIN ' + str);
    }
    else if (game.archerLoc[0] !== undefined && game.archers.length === 0 && game.knights.length === 0) {
        var str = game.archerLoc[0];
        console.log('TRAIN ' + str);
    }
    else console.log('TRAIN');
    console.error(units.length + ' ' + game.knights + ' ' + game.archers);
}