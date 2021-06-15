// Module extents
class ParserSJson {
  parse(data) {

  }
}

class ParserSXML {
  restore(data) {
    
  }
}

class ParserSBin {
  load(data) {
    
  }
}


// Adapter

class ParserAdapter {
  parse(data) {}
}

class ParserSJsonAdapter extends ParserAdapter {
  constructor(parserSJson) {
    this._parser = parserSJson;
  }

  parse(data) {
    return this._parser.parse(data);
  }
}

class ParserSXMLAdapter extends ParserAdapter {
  constructor(parserSXML) {
    this._parser = parserSXML;
  }

  parse(data) {
    return this._parser.restore(data);
  }
}

class ParserSBinAdapter extends ParserAdapter {
  constructor(parserSBin) {
    this._parser = parserSBin;
  }

  parse(data) {
    return this._parser.load(data);
  }
}
// Client good
const adapter = Factory.create;
adapter.parse(data)

// Client bad
if (typeOfDate == 0) {
  parseData = new ParserSJson().parse(data)
} else if (typeOfDate == 1) {
  parseData = new ParserSXML().restore(data)
} else if (typeOfDate == 2) {
  parseData = new ParserSBin().load(data)
}