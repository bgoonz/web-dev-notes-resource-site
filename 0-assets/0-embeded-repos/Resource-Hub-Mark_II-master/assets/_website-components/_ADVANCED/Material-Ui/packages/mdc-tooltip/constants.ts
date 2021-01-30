

enum CssClasses {
  RICH = 'mdc-tooltip--rich',
  SHOWN = 'mdc-tooltip--shown',
  SHOWING = 'mdc-tooltip--showing',
  SHOWING_TRANSITION = 'mdc-tooltip--showing-transition',
  HIDE = 'mdc-tooltip--hide',
  HIDE_TRANSITION = 'mdc-tooltip--hide-transition',
  MULTILINE_TOOLTIP = 'mdc-tooltip--multiline',
}

const numbers = {
  BOUNDED_ANCHOR_GAP: 4,
  UNBOUNDED_ANCHOR_GAP: 8,
  MIN_VIEWPORT_TOOLTIP_THRESHOLD: 8,
  HIDE_DELAY_MS: 600,
  SHOW_DELAY_MS: 500,
  // LINT.IfChange(tooltip-dimensions)
  MIN_HEIGHT: 24,
  MAX_WIDTH: 200,
  // LINT.ThenChange(_tooltip.scss:tooltip-dimensions)
};

const attributes = {
  ARIA_EXPANDED: 'aria-expanded',
  ARIA_HASPOPUP: 'aria-haspopup',
  PERSISTENT: 'data-mdc-tooltip-persistent',
};

const events = {
  HIDDEN: 'MDCTooltip:hidden',
};

/** Enum for possible tooltip positioning relative to its anchor element. */
enum XPosition {
  DETECTED = 0,
  START = 1,
  CENTER = 2,
  END = 3,
}

enum YPosition {
  DETECTED = 0,
  ABOVE = 1,
  BELOW = 2,
}

/**
 * Enum for possible anchor boundary types. This determines the gap between the
 * bottom of the anchor and the tooltip element.
 * Bounded anchors have an identifiable boundary (e.g. buttons).
 * Unbounded anchors don't have a visually declared boundary (e.g. plain text).
 */
enum AnchorBoundaryType {
  BOUNDED = 0,
  UNBOUNDED = 1,
}

export {
  CssClasses,
  numbers,
  attributes,
  events,
  XPosition,
  AnchorBoundaryType,
  YPosition
};
