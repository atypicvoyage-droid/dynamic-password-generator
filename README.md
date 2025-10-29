# 🔐 Dynamic Password Generator

A **client-side password generator** that uses the Web Crypto API for cryptographically secure random passwords. Zero server transmission, complete transparency.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://dynamicpassgen.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/password-generator?style=social)](https://github.com/yourusername/password-generator)

[**🚀 Try it Live**](https://dynamicpassgen.com) | [**📖 Documentation**](#features) | [**🐛 Report Bug**](https://github.com/yourusername/password-generator/issues)

---

## 🎯 Why Another Password Generator?

Most password generators either:
- ❌ Send your passwords to servers (huge security risk)
- ❌ Use weak randomness like `Math.random()` (predictable)
- ❌ Require signup for basic features
- ❌ Track your usage

**This generator:**
- ✅ 100% client-side processing (verifiable)
- ✅ Uses Web Crypto API (`crypto.getRandomValues()`)
- ✅ NIST SP 800-63B compliant
- ✅ No tracking, no ads, no signup
- ✅ Open source and auditable

---

## ✨ Features

### 🔒 **Cryptographically Secure**
- Uses [`crypto.getRandomValues()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) - a CSPRNG (Cryptographically Secure Pseudo-Random Number Generator)
- Sources entropy from OS-level random sources (hardware noise, system timing, etc.)
- Mathematically impossible to predict, even with unlimited computing power

### 📊 **Real-Time Strength Analysis**
- Entropy calculation (bits of randomness)
- Estimated crack time (based on current attack speeds)
- Visual strength indicator
- Character set diversity analysis

### 🎨 **User Experience**
- Instant generation (no page reload)
- One-click copy to clipboard
- Mobile-responsive design
- Dark mode support
- Password visibility toggle
- History tracking (session only)

### 🛡️ **Privacy First**
- Zero server communication (verify in DevTools Network tab)
- No cookies, no tracking
- No data collection
- All processing in browser memory
- Source code fully auditable

---

## 🚀 Quick Start

### Try the Live Version
Visit **[dynamicpassgen.com](https://dynamicpassgen.com)** to use the tool immediately.

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/password-generator.git
   cd password-generator
   ```

2. **Open in browser**
   ```bash
   # Just open index.html in your browser
   open index.html  # macOS
   xdg-open index.html  # Linux
   start index.html  # Windows
   ```

   Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (with http-server)
   npx http-server
   ```

3. **Access locally**
   Open `http://localhost:8000` in your browser

---

## 🔍 How It Works

### Password Generation Algorithm

```javascript
function generatePassword(length, charSets) {
  // 1. Create character pool from enabled sets
  const charset = charSets.join('');

  // 2. Generate cryptographically secure random bytes
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  // 3. Map random values to characters
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset[randomValues[i] % charset.length];
  }

  return password;
}
```

### Why Web Crypto API?

**Math.random()** (Bad ❌):
- Uses a simple algorithm (Linear Congruential Generator)
- Predictable with enough samples
- Not designed for cryptography
- ~32-bit state space (easy to brute force)

**crypto.getRandomValues()** (Good ✅):
- Uses OS-level CSPRNG
- Sources from hardware entropy (CPU jitter, disk timing, etc.)
- 128-256 bit state space
- Meets NIST SP 800-90A standards
- Forward secrecy (past outputs don't reveal future ones)

### Entropy Calculation

```javascript
function calculateEntropy(password, charsetSize) {
  // Entropy = log2(possibleCombinations)
  // possibleCombinations = charsetSize^passwordLength
  const entropy = Math.log2(Math.pow(charsetSize, password.length));
  return Math.round(entropy);
}
```

**Example:**
- 16-character password with all 94 printable ASCII characters:
- Entropy = log₂(94¹⁶) ≈ **105 bits**
- Possible combinations: 94¹⁶ ≈ 5.4 × 10³¹
- Crack time (at 10 billion guesses/sec): **~171 trillion years**

---

## 🔐 Security Model

### Threat Model

**What we protect against:**
- ✅ Brute force attacks (high entropy passwords)
- ✅ Dictionary attacks (truly random, no patterns)
- ✅ Rainbow table attacks (unique every time)
- ✅ PRNG prediction attacks (CSPRNG prevents this)
- ✅ Server-side logging (client-side only)
- ✅ Man-in-the-middle attacks (nothing transmitted)

**What we DON'T protect against:**
- ❌ Malware on your device (keyloggers, screen capture)
- ❌ Compromised browser (malicious extensions)
- ❌ Physical access to device
- ❌ Shoulder surfing

### Privacy Verification

**Verify zero server transmission:**
1. Open your browser's DevTools (`F12`)
2. Go to **Network** tab
3. Click "Generate Password"
4. Observe: **Zero outbound requests**

No data leaves your device. Period.

### NIST Compliance

This generator follows [NIST SP 800-63B](https://pages.nist.gov/800-63-3/sp800-63b.html) guidelines:
- ✅ Minimum 8 characters (we default to 16-20)
- ✅ Support for all printable ASCII characters
- ✅ No composition rules (user choice)
- ✅ No periodic password changes required
- ✅ Check against common passwords (optional feature)

---

## 📁 Project Structure

```
password-generator/
├── index.html              # Main HTML structure
├── css/
│   └── style.css          # Styling and design
├── js/
│   ├── generator_js.js    # Core password generation logic
│   ├── clipboard_js.js    # Clipboard functionality
│   └── strength_meter_js.js # Strength calculation & display
├── README.md              # This file
├── LICENSE                # MIT License
└── .gitignore            # Git ignore rules
```

---

## 🛠️ Technology Stack

- **Frontend:** Vanilla JavaScript (no frameworks)
- **Crypto:** [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- **Styling:** CSS3 with CSS Variables
- **Icons:** Unicode/Emoji (no external dependencies)
- **Hosting:** Static site (works anywhere)

**Why Vanilla JS?**
- Zero dependencies = zero vulnerabilities
- Smaller bundle size (faster load)
- Easier to audit (no framework complexity)
- Works forever (no breaking updates)

---

## 🎨 Customization

### Change Default Settings

Edit `js/generator_js.js`:

```javascript
// Default password length
const DEFAULT_LENGTH = 20;  // Change this

// Default character sets
const DEFAULT_SETTINGS = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false
};
```

### Add Custom Character Sets

```javascript
// In generator_js.js
const EMOJI_CHARSET = '😀😃😄😁😆😅🤣😂🙂🙃';

// Then add to character pool
if (settings.emoji) {
  charset += EMOJI_CHARSET;
}
```

### Styling

All colors and spacing use CSS Variables in `css/style.css`:

```css
:root {
  --color-primary: rgb(33, 128, 141);
  --color-surface: rgb(255, 255, 253);
  --space-16: 16px;
  /* Modify these to change design */
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly** (especially security features)
5. **Commit with clear message**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Maintain zero dependencies
- Keep client-side only (no server code)
- Add tests for new features
- Update README with new features
- Follow existing code style
- Security changes require thorough review

---

## 📊 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 37+     | ✅ Full support |
| Firefox | 36+     | ✅ Full support |
| Safari  | 11+     | ✅ Full support |
| Edge    | 79+     | ✅ Full support |
| Opera   | 24+     | ✅ Full support |

**Note:** Web Crypto API is available in all modern browsers. IE11 and older are not supported (and shouldn't be used anyway for security reasons).

---

## 🧪 Testing

### Manual Testing

1. **Generate passwords** with various settings
2. **Verify strength meter** shows correct values
3. **Test copy button** works in different browsers
4. **Check mobile responsiveness**
5. **Verify zero network requests** (DevTools)

### Automated Testing

```bash
# Coming soon: Unit tests for core functions
npm test
```

### Security Audit

```bash
# Check for vulnerabilities in dependencies (we have none!)
npm audit
```

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**TL;DR:** You can use, modify, and distribute this code freely, even commercially. Just keep the license notice.

---

## 🙏 Acknowledgments

- [NIST SP 800-63B](https://pages.nist.gov/800-63-3/sp800-63b.html) for password guidelines
- [MDN Web Docs](https://developer.mozilla.org/) for Web Crypto API documentation
- [OWASP](https://owasp.org/) for security best practices
- All contributors and users who reported issues

---

## 🔗 Links

- **Live Demo:** [dynamicpassgen.com](https://dynamicpassgen.com)
- **Report Bug:** [GitHub Issues](https://github.com/yourusername/password-generator/issues)
- **Request Feature:** [GitHub Discussions](https://github.com/yourusername/password-generator/discussions)
- **Twitter:** [@yourusername](https://twitter.com/yourusername)

---

## 📈 Stats

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/password-generator)
![GitHub code size](https://img.shields.io/github/languages/code-size/yourusername/password-generator)
![Lines of code](https://img.shields.io/tokei/lines/github/yourusername/password-generator)

---

## ⭐ Star History

If this project helped you, consider giving it a star! It helps others discover it.

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/password-generator&type=Date)](https://star-history.com/#yourusername/password-generator&Date)

---

<p align="center">
  Made with ❤️ for privacy and security
  <br>
  <a href="https://dynamicpassgen.com">dynamicpassgen.com</a>
</p>
