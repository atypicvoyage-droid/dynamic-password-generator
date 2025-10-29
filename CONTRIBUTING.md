# Contributing to Dynamic Password Generator

Thank you for considering contributing! Here's how you can help.

## 🐛 Reporting Bugs

**Before submitting:**
- Check existing [issues](https://github.com/yourusername/password-generator/issues)
- Test in multiple browsers
- Verify the bug exists in latest version

**Bug report should include:**
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## ✨ Suggesting Features

Open a [GitHub Discussion](https://github.com/yourusername/password-generator/discussions) with:
- Clear use case
- Why it benefits users
- How it fits the project goals (privacy, security, simplicity)

## 🔧 Pull Requests

### Guidelines

1. **Fork & Clone**
   ```bash
   git clone https://github.com/yourusername/password-generator.git
   cd password-generator
   ```

2. **Create Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Keep client-side only (no server code)
   - Maintain zero dependencies
   - Follow existing code style
   - Add comments for complex logic

4. **Test Thoroughly**
   - Test all password generation scenarios
   - Verify zero network requests (F12 → Network tab)
   - Check mobile responsiveness
   - Test in multiple browsers

5. **Commit**
   ```bash
   git commit -m "Add: feature description"
   ```

   Use prefixes:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for improvements
   - `Docs:` for documentation

6. **Push & PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a Pull Request with:
   - Clear description
   - Reference related issues
   - Screenshots (if UI changes)

### Security Contributions

Security is critical. If submitting security-related changes:
- Explain the threat model
- Show why the change improves security
- Provide references (NIST, OWASP, etc.)
- Test extensively

**For security vulnerabilities:**
- Do NOT open public issues
- Email: security@dynamicpassgen.com
- We'll coordinate disclosure

## 💻 Development Setup

```bash
# 1. Clone repo
git clone https://github.com/yourusername/password-generator.git

# 2. Open in browser
open index.html

# Or use local server
python -m http.server 8000
```

No build process needed - it's vanilla JavaScript!

## 📝 Code Style

- Use ES6+ features
- 2-space indentation
- Semicolons required
- CamelCase for variables/functions
- UPPERCASE for constants
- Comments for complex logic

```javascript
// Good
const DEFAULT_LENGTH = 16;

function generatePassword(length, charset) {
  // Implementation
}

// Bad
var default_length = 16;

function GeneratePassword(Length, Charset) {
  // Implementation
}
```

## ❌ What We Won't Accept

- Dependencies (libraries, frameworks)
- Server-side code
- Tracking/analytics that compromise privacy
- Ads or monetization
- Complexity without clear benefit

## ✅ What We Love

- Performance improvements
- Security enhancements
- Accessibility improvements
- Mobile UX improvements
- Clear documentation
- Bug fixes

## 📖 Resources

- [Web Crypto API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [NIST Password Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html)
- [OWASP Secure Coding](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)

## 🙏 Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Given credit in commit messages

Thank you for helping make password generation more secure for everyone! 🔐
