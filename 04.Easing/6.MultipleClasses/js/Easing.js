class Easing {
  constructor() {}

  /**
   *
   * all calculations on time to ease movement
   */
  static backInOut(t) {
    const s = 1.70158 * 1.525;
    if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
  }

  static backIn(t) {
    const s = 1.70158;
    return t * t * ((s + 1) * t - s);
  }

  static backOut(t) {
    const s = 1.70158;
    return --t * t * ((s + 1) * t + s) + 1;
  }

  static bounceInOut(t) {
    if (t < 0.5) return easing.bounceIn(t * 2) * 0.5;
    return easing.bounceOut(t * 2 - 1) * 0.5 + 0.5;
  }

  static bounceIn(t) {
    return 1 - easing.bounceOut(1 - t);
  }

  static bounceOut(t) {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  }

  static circInOut(t) {
    if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
    return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
  }

  static circIn(t) {
    return 1 - Math.sqrt(1 - t * t);
  }

  static circOut(t) {
    return Math.sqrt(1 - --t * t);
  }

  static cubicInOut(t) {
    if ((t *= 2) < 1) return 0.5 * t * t * t;
    return 0.5 * ((t -= 2) * t * t + 2);
  }

  static cubicIn(t) {
    return t * t * t;
  }

  static cubicOut(t) {
    return --t * t * t + 1;
  }

  static elasticInOut(t) {
    if ((t *= 2) < 1)
      return (
        0.5 * Math.sin(((13 * Math.PI) / 2) * t) * Math.pow(2, 10 * (t - 1))
      );
    return (
      0.5 *
      (Math.sin(((-13 * Math.PI) / 2) * (t - 1)) * Math.pow(2, -10 * (t - 1)) +
        2)
    );
  }

  static elasticIn(t) {
    return Math.sin(((13 * Math.PI) / 2) * t) * Math.pow(2, 10 * (t - 1));
  }

  static elasticOut(t) {
    return Math.sin(((-13 * Math.PI) / 2) * (t + 1)) * Math.pow(2, -10 * t) + 1;
  }

  static expoInOut(t) {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t *= 2) < 1) return 0.5 * Math.pow(1024, t - 1);
    return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
  }

  static expoIn(t) {
    return t === 0 ? 0 : Math.pow(1024, t - 1);
  }

  static expoOut(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  static quadInOut(t) {
    if ((t *= 2) < 1) return 0.5 * t * t;
    return -0.5 * (--t * (t - 2) - 1);
  }

  static quadIn(t) {
    return t * t;
  }

  static quadOut(t) {
    return -t * (t - 2);
  }

  static quartInOut(t) {
    if ((t *= 2) < 1) return 0.5 * t * t * t * t;
    return -0.5 * ((t -= 2) * t * t * t - 2);
  }

  static quartIn(t) {
    return t * t * t * t;
  }

  static quartOut(t) {
    return 1 - --t * t * t * t;
  }

  static quintInOut(t) {
    if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
  }

  static quintIn(t) {
    return t * t * t * t * t;
  }

  static quintOut(t) {
    return --t * t * t * t * t + 1;
  }

  static sineInOut(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
  }

  static sineIn(t) {
    return 1 - Math.cos((t * Math.PI) / 2);
  }

  static sineOut(t) {
    return Math.sin((t * Math.PI) / 2);
  }

  static linear(t) {
    return t;
  }
}
