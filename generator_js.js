/**
 * Dynamic Password Generator - Core Module
 * 
 * Generates cryptographically secure random passwords using Web Crypto API.
 * All processing happens client-side - zero server transmission.
 * 
 * @author DynamicPassGen
 * @license MIT
 * @see https://dynamicpassgen.com
 */

// ============================================================================
// CHARACTER SETS
// ============================================================================

const CHARSET = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  ambiguous: '0O1lI'  // Characters that look similar
};

// Default configuration
const DEFAULT_CONFIG = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false
};

// ============================================================================
// PASSWORD GENERATION
// ============================================================================

/**
 * Generate a cryptographically secure random password
 * 
 * Uses crypto.getRandomValues() - a CSPRNG that sources entropy from:
 * - Hardware random number generators
 * - OS entropy pools (/dev/urandom on Unix, CryptGenRandom on Windows)
 * - CPU timing jitter, disk drive noise, network packet timing
 * 
 * @param {number} length - Password length (8-64)
 * @param {Object} options - Character set options
 * @returns {string} Generated password
 */
function generateSecurePassword(length, options = {}) {
  // Merge with defaults
  const config = { ...DEFAULT_CONFIG, ...options };

  // Build character pool
  let charset = buildCharacterSet(config);

  // Validate
  if (charset.length === 0) {
    throw new Error('At least one character type must be enabled');
  }

  if (length < 8 || length > 64) {
    throw new Error('Password length must be between 8 and 64');
  }

  // Generate cryptographically secure random password
  return generateFromCharset(length, charset);
}

/**
 * Build character set based on user options
 * 
 * @param {Object} config - Configuration object
 * @returns {string} Combined character set
 */
function buildCharacterSet(config) {
  let charset = '';

  if (config.uppercase) charset += CHARSET.uppercase;
  if (config.lowercase) charset += CHARSET.lowercase;
  if (config.numbers) charset += CHARSET.numbers;
  if (config.symbols) charset += CHARSET.symbols;

  // Remove ambiguous characters if requested
  if (config.excludeAmbiguous) {
    charset = charset.split('')
      .filter(char => !CHARSET.ambiguous.includes(char))
      .join('');
  }

  return charset;
}

/**
 * Generate password from character set using Web Crypto API
 * 
 * This uses crypto.getRandomValues() which is:
 * - Cryptographically secure (meets NIST SP 800-90A standards)
 * - Unpredictable (even with knowledge of all previous outputs)
 * - Properly seeded (from OS-level entropy sources)
 * 
 * Math.random() is NOT used because:
 * - It's a PRNG (Pseudo-Random, not Cryptographically Secure)
 * - It's predictable with enough samples
 * - It has a small state space (~32 bits)
 * - It's designed for games, not cryptography
 * 
 * @param {number} length - Desired password length
 * @param {string} charset - Available characters
 * @returns {string} Generated password
 */
function generateFromCharset(length, charset) {
  const charsetLength = charset.length;
  let password = '';

  // Generate random values
  // Using Uint32Array for better distribution
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  // Map random values to characters
  // Using modulo is safe here because:
  // 1. Charset length is small (< 100)
  // 2. Uint32Array provides 32 bits per value
  // 3. Bias is negligible: (2^32 % 94) / 2^32 < 0.000002%
  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % charsetLength;
    password += charset[randomIndex];
  }

  return password;
}

// ============================================================================
// STRENGTH CALCULATION
// ============================================================================

/**
 * Calculate password entropy (randomness in bits)
 * 
 * Entropy formula: E = log2(R^L)
 * Where:
 * - R = size of character set (e.g., 94 for all printable ASCII)
 * - L = password length
 * 
 * Examples:
 * - 8 chars, lowercase only (26): log2(26^8) = 37.6 bits
 * - 16 chars, all types (94): log2(94^16) = 105.3 bits
 * - 24 chars, all types (94): log2(94^24) = 157.9 bits
 * 
 * Security levels:
 * - < 28 bits: Very weak (crackable in seconds)
 * - 28-35 bits: Weak (crackable in minutes)
 * - 36-59 bits: Moderate (crackable in days/weeks)
 * - 60-79 bits: Strong (crackable in years)
 * - 80+ bits: Very strong (uncrackable with current technology)
 * 
 * @param {string} password - Password to analyze
 * @param {number} charsetSize - Size of character set used
 * @returns {number} Entropy in bits
 */
function calculateEntropy(password, charsetSize) {
  const length = password.length;

  // E = log2(charsetSize^length)
  // Using logarithm property: log2(a^b) = b * log2(a)
  const entropy = length * Math.log2(charsetSize);

  return Math.round(entropy);
}

/**
 * Estimate time to crack password
 * 
 * Assumes:
 * - Attacker has 10 billion guesses per second (high-end GPU cluster)
 * - Attacker knows the character set (Kerckhoffs's principle)
 * - Brute force attack (trying all combinations)
 * 
 * Reality:
 * - Online attacks are MUCH slower (rate limiting)
 * - Offline attacks can be faster (quantum computers in future)
 * - This is a conservative estimate for comparison purposes
 * 
 * @param {number} entropy - Password entropy in bits
 * @returns {string} Human-readable time estimate
 */
function estimateCrackTime(entropy) {
  const GUESSES_PER_SECOND = 10_000_000_000; // 10 billion (GPU cluster)

  // Total possible combinations = 2^entropy
  const combinations = Math.pow(2, entropy);

  // Average time to crack = (combinations / 2) / guesses_per_second
  const secondsToCrack = (combinations / 2) / GUESSES_PER_SECOND;

  return formatTime(secondsToCrack);
}

/**
 * Format seconds into human-readable time
 * 
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
function formatTime(seconds) {
  const MINUTE = 60;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const YEAR = 365.25 * DAY;
  const MILLENNIUM = 1000 * YEAR;

  if (seconds < 1) return 'Instant';
  if (seconds < MINUTE) return `${Math.round(seconds)} seconds`;
  if (seconds < HOUR) return `${Math.round(seconds / MINUTE)} minutes`;
  if (seconds < DAY) return `${Math.round(seconds / HOUR)} hours`;
  if (seconds < YEAR) return `${Math.round(seconds / DAY)} days`;
  if (seconds < MILLENNIUM) return `${Math.round(seconds / YEAR)} years`;

  const millennia = Math.round(seconds / MILLENNIUM);
  return `${millennia.toLocaleString()} millennia`;
}

/**
 * Get strength level based on entropy
 * 
 * @param {number} entropy - Entropy in bits
 * @returns {Object} Strength level and color
 */
function getStrengthLevel(entropy) {
  if (entropy < 28) return { level: 'Very Weak', color: 'red', score: 0 };
  if (entropy < 36) return { level: 'Weak', color: 'orange', score: 1 };
  if (entropy < 60) return { level: 'Moderate', color: 'yellow', score: 2 };
  if (entropy < 80) return { level: 'Strong', color: 'lightgreen', score: 3 };
  return { level: 'Very Strong', color: 'green', score: 4 };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Detect character set size from password
 * 
 * @param {string} password - Password to analyze
 * @returns {number} Estimated character set size
 */
function detectCharsetSize(password) {
  let size = 0;

  if (/[a-z]/.test(password)) size += 26;
  if (/[A-Z]/.test(password)) size += 26;
  if (/[0-9]/.test(password)) size += 10;
  if (/[^a-zA-Z0-9]/.test(password)) size += 32; // Approximate symbol count

  return size || 1; // Avoid division by zero
}

/**
 * Copy text to clipboard
 * 
 * Uses modern Clipboard API with fallback
 * 
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
async function copyToClipboard(text) {
  try {
    // Modern approach (Clipboard API)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    document.body.appendChild(textarea);
    textarea.select();

    const success = document.execCommand('copy');
    document.body.removeChild(textarea);

    return success;
  } catch (error) {
    console.error('Copy failed:', error);
    return false;
  }
}

// ============================================================================
// EXPORTS (for testing or module use)
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateSecurePassword,
    calculateEntropy,
    estimateCrackTime,
    getStrengthLevel,
    detectCharsetSize,
    copyToClipboard
  };
}
