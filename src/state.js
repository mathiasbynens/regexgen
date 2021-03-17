const Map = require('./map');

const print = (state, prefix = '') => {
  if (state.accepting) {
    console.log(`${prefix}`);
  }
  if (state.transitions.size === 0) {
    return;
  }
  for (const [ch, otherState] of state.transitions) {
    print(otherState, prefix ? `${prefix} => ${ch}` : `${ch}`);
  }
};

/**
 * Represents a state in a DFA.
 */
class State {
  constructor() {
    this.accepting = false;
    this.transitions = new Map(k => new State);
  }

  /**
   * A generator that yields all states in the subtree
   * starting with this state.
   */
  *visit(visited = new Set) {
    if (visited.has(this)) return;
    visited.add(this);

    yield this;
    for (let state of this.transitions.values()) {
      yield* state.visit(visited);
    }
  }

  toString() {
    print(this);
  }
}

module.exports = State;
