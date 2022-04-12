export default class Policy {
  raw = "";
  directives: { [key: string]: string } = {};

  static updates = {
    "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    "font-src": ["https://fonts.googleapis.com"],
  };

  constructor(raw: string) {
    this.raw = raw;

    const directives = this.raw.split(";");
    for (let i = 0; i < directives.length; ++i) {
      const directive = directives[i].trim();
      const tokens = directive.split(/\s+/);

      const name = tokens[0];
      if (!name) continue;

      const values = tokens.slice(1, tokens.length);
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
      const directiveValues = this.directives[directive].split(" ");
      const index = directiveValues.indexOf(value);
      if (index > -1) {
        directiveValues.splice(index, 1);
        this.directives[directive] = directiveValues.join(" ");
      }
    }
  }

  toString() {
    let out = "";

    for (const directive in this.directives) {
      if (this.directives[directive]) {
        out += directive + " " + this.directives[directive] + "; ";
      }
    }

    return out.trim();
  }

  toPrettyString() {
    let out = "";

    for (const directive in this.directives) {
      if (this.directives[directive])
        out += directive + "\n\t" + this.directives[directive] + ";\n";
    }

    return out.substring(0, out.length - 1);
  }

  static isPolicyHeader(name: string) {
    name = name.toUpperCase();
    return (
      name == "CONTENT-SECURITY-POLICY" ||
      name == "X-WEBKIT-CSP" ||
      name == "X-FRAME-OPTIONS"
    );
  }

  static updatePolicy(raw: string) {
    const policy = new Policy(raw);

    Object.keys(this.updates).forEach((key) => {
      const value = policy.get(key);
      if (!value) return;

      this.updates[key].forEach((update: string) => {
        if (!value.includes(update)) policy.add(key, update);
      });
    });

    return policy.toString();
  }
}
