export default class Policy {
  raw: string = "";
  directives: { [key: string]: string } = {};

  constructor(raw: string) {
    this.raw = raw;

    let directives = this.raw.split(";");
    for (let i = 0; i < directives.length; ++i) {
      let directive = directives[i].trim();
      let tokens = directive.split(/\s+/);

      let name = tokens[0];
      if (!name) continue;

      let values = tokens.slice(1, tokens.length);
      this.directives[name] = values.join(" ");
    }
  }

  get(directive: string) {
    if (!this.directives[directive]) return "";
    return this.directives[directive];
  }

  set(directive: string, value: string) {
    if (!value) {
      delete this.directives[directive];
      return;
    }

    this.directives[directive] = value;
    return this.directives[directive];
  }

  add(directive: string, value: string) {
    if (!this.directives[directive]) this.directives[directive] = value;
    else this.directives[directive] += " " + value;

    return this.directives[directive];
  }

  remove(directive: string, value: string) {
    if (!this.directives[directive]) {
      return;
    } else {
      let directiveValues = this.directives[directive].split(" ");
      let index = directiveValues.indexOf(value);
      if (index > -1) {
        directiveValues.splice(index, 1);
        this.directives[directive] = directiveValues.join(" ");
      }
    }
  }

  toString() {
    let out = "";

    for (let directive in this.directives) {
      if (this.directives[directive]) {
        out += directive + " " + this.directives[directive] + "; ";
      }
    }

    return out.trim();
  }

  toPrettyString() {
    let out = "";

    for (let directive in this.directives) {
      if (this.directives[directive])
        out += directive + "\n\t" + this.directives[directive] + ";\n";
    }

    return out.substring(0, out.length - 1);
  }

  static isPolicyHeader(name: string) {
    name = name.toUpperCase();
    return name == "CONTENT-SECURITY-POLICY" || name == "X-WEBKIT-CSP";
  }

  static updatePolicy(raw: string) {
    const policy = new Policy(raw);

    if (policy.get("style-src")) {
      policy.add("style-src", "'self'");
      policy.add("style-src", "'unsafe-inline'");
      policy.add("style-src", "https://fonts.googleapis.com");
    }

    if (policy.get("font-src"))
      policy.add("font-src", "https://fonts.gstatic.com");

    return policy.toString();
  }
}
