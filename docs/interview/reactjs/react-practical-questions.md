# 100 React.js Practical & Coding Interview Questions

> A comprehensive master collection of 100 practical React.js coding interview challenges, real-world component implementations, custom hooks, and state patterns, categorized into 50 Basic and 50 Intermediate to Advanced coding problems.

---

## 📑 Index & Practice Distribution

| Category | Range | Topics Covered |
| :--- | :--- | :--- |
| [**Part 1: Basic Practical & Coding Challenges**](#part-1-basic-practical-coding-challenges-questions-1-50) | Q1 – Q50 | Counters, toggles, character limiters, search filters, accordions, tabs, modals, star ratings, carousel sliders, timers, stopwatches, pure CSS dark mode toggles, forms with disabled states, progress bars, tag inputs, list sorting |
| [**Part 2: Intermediate & Advanced Coding Challenges**](#part-2-intermediate-advanced-coding-challenges-questions-51-100) | Q51 – Q100 | API fetching with abort controllers, debounce/throttle, custom hooks (`useDebounce`, `useLocalStorage`, `useOnClickOutside`, `useFetch`, `useInterval`), controlled form validation schemas, optimistic UI updates, React Router DOM (dynamic routes, layouts, protected routes, search params), `useMemo` & `useCallback` optimization, Portals, `useReducer` shopping carts, OTP inputs, recursive tree rendering |

---

# Part 1: Basic Practical & Coding Challenges (Questions 1 – 50)

### Q1: Build a simple Counter with increment, decrement, and reset.
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(prev => prev - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
    </div>
  );
}
```

---

### Q2: Build a Toggle component that reveals and hides text.
```jsx
import { useState } from 'react';

function ToggleText() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(prev => !prev)}>
        {isVisible ? 'Hide Details' : 'Show Details'}
      </button>
      {isVisible && <p>Here are the secret engineering notes!</p>}
    </div>
  );
}
```

---

### Q3: Build a Controlled Input that mirrors text in real time.
```jsx
import { useState } from 'react';

function TextMirror() {
  const [text, setText] = useState('');

  return (
    <div>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type something..." 
      />
      <p>Live Preview: {text}</p>
    </div>
  );
}
```

---

### Q4: Create a character counter for a textarea with a max limit.
```jsx
import { useState } from 'react';

function CharacterCounter({ maxChars = 100 }) {
  const [content, setContent] = useState('');

  return (
    <div>
      <textarea
        maxLength={maxChars}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div>
        <span>{content.length} / {maxChars} characters</span>
        {content.length >= maxChars && <p style={{ color: 'red' }}>Limit reached!</p>}
      </div>
    </div>
  );
}
```

---

### Q5: Build a simple Todo List (Add item and display).
```jsx
import { useState } from 'react';

function SimpleTodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  function handleAdd() {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput('');
  }

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
      </ul>
    </div>
  );
}
```

---

### Q6: Add a Delete button to remove specific items from a list by ID.
```jsx
function TodoItem({ todo, onDelete }) {
  return (
    <li>
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}
// Delete Handler in parent:
// setTodos(todos.filter(item => item.id !== idToDelete));
```

---

### Q7: Toggle completion (line-through strike) on a Todo item.
```jsx
function toggleTodo(todos, id) {
  return todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}
// Render: <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
```

---

### Q8: Filter a list of items based on a search query.
```jsx
import { useState } from 'react';

function SearchFilter({ items }) {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
      <ul>
        {filteredItems.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}
```

---

### Q9: Toggle password visibility (`type="password"` vs `type="text"`).
```jsx
import { useState } from 'react';

function PasswordField() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');

  return (
    <div>
      <input 
        type={show ? 'text' : 'password'} 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="button" onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}
```

---

### Q10: Disable a form submit button until required fields are filled.
```jsx
import { useState } from 'react';

function SimpleForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.trim() !== '' && password.length >= 6;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit" disabled={!isFormValid}>Log In</button>
    </form>
  );
}
```

---

### Q11: Build an Accordion FAQ item that expands and collapses.
```jsx
import { useState } from 'react';

function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{ width: '100%', textAlign: 'left', fontWeight: 'bold' }}>
        {question} {isOpen ? '▲' : '▼'}
      </button>
      {isOpen && <p style={{ marginTop: '8px' }}>{answer}</p>}
    </div>
  );
}
```

---

### Q12: Build a Tab Switcher component with 3 tabs.
```jsx
import { useState } from 'react';

function TabSwitcher() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => setActiveTab('profile')}>Profile</button>
        <button onClick={() => setActiveTab('security')}>Security</button>
        <button onClick={() => setActiveTab('billing')}>Billing</button>
      </div>
      <div style={{ marginTop: '16px' }}>
        {activeTab === 'profile' && <div>Profile Settings View</div>}
        {activeTab === 'security' && <div>Security & 2FA View</div>}
        {activeTab === 'billing' && <div>Invoices & Payment Methods</div>}
      </div>
    </div>
  );
}
```

---

### Q13: Build a Modal Dialog with Open and Close functionality.
```jsx
import { useState } from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center' }}>
      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', minWidth: '300px' }}>
        {children}
        <button onClick={onClose} style={{ marginTop: '12px' }}>Close</button>
      </div>
    </div>
  );
}
```

---

### Q14: Build a Star Rating component (1 to 5 stars).
```jsx
import { useState } from 'react';

function StarRating({ totalStars = 5 }) {
  const [rating, setRating] = useState(0);

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            onClick={() => setRating(starValue)}
            style={{ cursor: 'pointer', fontSize: '24px', color: starValue <= rating ? '#eab308' : '#cbd5e1' }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
```

---

### Q15: Build a Copy to Clipboard button with temporary "Copied!" feedback.
```jsx
import { useState } from 'react';

function CopyButton({ textToCopy }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button onClick={handleCopy}>
      {copied ? '✅ Copied!' : '📋 Copy Text'}
    </button>
  );
}
```

---

### Q16: Build a simple Countdown Timer from 10 to 0.
```jsx
import { useState, useEffect } from 'react';

function CountdownTimer({ start = 10 }) {
  const [timeLeft, setTimeLeft] = useState(start);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return <div>{timeLeft > 0 ? `Time Remaining: ${timeLeft}s` : '🚀 Blast Off!'}</div>;
}
```

---

### Q17: Build a Stopwatch with Start, Pause, and Reset.
```jsx
import { useState, useEffect } from 'react';

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <h2>{seconds}s</h2>
      <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={() => { setIsRunning(false); setSeconds(0); }}>Reset</button>
    </div>
  );
}
```

---

### Q18: Build an Image Carousel / Slider with Next and Prev buttons.
```jsx
import { useState } from 'react';

function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function next() {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }

  function prev() {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  }

  return (
    <div>
      <img src={images[currentIndex]} alt="Slide" style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
      <div>
        <button onClick={prev}>Previous</button>
        <span> {currentIndex + 1} / {images.length} </span>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}
```

---

### Q19: Build a dynamic Background Color Changer with a color picker input.
```jsx
import { useState } from 'react';

function ColorPicker() {
  const [color, setColor] = useState('#4f46e5');

  return (
    <div style={{ padding: '20px', backgroundColor: color, color: '#fff', borderRadius: '8px' }}>
      <p>Current Color: {color}</p>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
    </div>
  );
}
```

---

### Q20: Build a Temperature Converter (Celsius to Fahrenheit).
```jsx
import { useState } from 'react';

function TempConverter() {
  const [celsius, setCelsius] = useState('');

  const fahrenheit = celsius !== '' ? (parseFloat(celsius) * 9) / 5 + 32 : '';

  return (
    <div>
      <label>Celsius: </label>
      <input type="number" value={celsius} onChange={(e) => setCelsius(e.target.value)} />
      <p>Fahrenheit: {fahrenheit ? `${fahrenheit.toFixed(1)} °F` : '-'}</p>
    </div>
  );
}
```

---

### Q21: Build a dynamic Progress Bar component based on a percentage prop.
```jsx
function ProgressBar({ progress = 0 }) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div style={{ width: '100%', height: '12px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
      <div 
        style={{ 
          width: `${clamped}%`, 
          height: '100%', 
          background: '#4f46e5', 
          transition: 'width 0.3s ease' 
        }} 
      />
    </div>
  );
}
```

---

### Q22: Build a Tag/Chip Input where pressing Enter adds a tag.
```jsx
import { useState } from 'react';

function TagInput() {
  const [tags, setTags] = useState(['React', 'Vite']);
  const [input, setInput] = useState('');

  function handleKeyDown(e) {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput('');
    }
  }

  function removeTag(tagToRemove) {
    setTags(tags.filter(t => t !== tagToRemove));
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
        {tags.map(tag => (
          <span key={tag} style={{ background: '#e0e7ff', color: '#4338ca', padding: '4px 8px', borderRadius: '4px' }}>
            {tag} <button onClick={() => removeTag(tag)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>×</button>
          </span>
        ))}
      </div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyDown={handleKeyDown} 
        placeholder="Type tag and press Enter" 
      />
    </div>
  );
}
```

---

### Q23: Build a Dropdown Select updating a display card.
```jsx
import { useState } from 'react';

function RoleSelector() {
  const [role, setRole] = useState('Frontend');

  return (
    <div>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Frontend">Frontend Engineer</option>
        <option value="Backend">Backend Developer</option>
        <option value="FullStack">Full-Stack Architect</option>
      </select>
      <h4>Selected Role: {role}</h4>
    </div>
  );
}
```

---

### Q24: Build a "Select All" and individual Checkbox group.
```jsx
import { useState } from 'react';

const ITEMS = ['Item 1', 'Item 2', 'Item 3'];

function CheckboxGroup() {
  const [selected, setSelected] = useState([]);

  function toggleSelectAll() {
    setSelected(selected.length === ITEMS.length ? [] : [...ITEMS]);
  }

  function toggleItem(item) {
    setSelected(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  }

  return (
    <div>
      <label>
        <input 
          type="checkbox" 
          checked={selected.length === ITEMS.length} 
          onChange={toggleSelectAll} 
        /> Select All
      </label>
      <hr />
      {ITEMS.map(item => (
        <div key={item}>
          <label>
            <input 
              type="checkbox" 
              checked={selected.includes(item)} 
              onChange={() => toggleItem(item)} 
            /> {item}
          </label>
        </div>
      ))}
    </div>
  );
}
```

---

### Q25: Build an Auto-Focus Input on button click using `useRef`.
```jsx
import { useRef } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);

  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus me" />
      <button onClick={() => inputRef.current?.focus()}>Focus Input</button>
    </div>
  );
}
```

---

### Q26: Build a Scroll-to-Top button visible only after scrolling 300px.
```jsx
import { useState, useEffect } from 'react';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return visible ? (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{ position: 'fixed', bottom: 20, right: 20 }}
    >
      ⬆ Top
    </button>
  ) : null;
}
```

---

### Q27: Build a Like/Favorite Toggle button with count increment.
```jsx
import { useState } from 'react';

function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(42);

  function handleToggle() {
    setLiked(!liked);
    setLikes(prev => (liked ? prev - 1 : prev + 1));
  }

  return (
    <button onClick={handleToggle} style={{ color: liked ? 'red' : 'gray' }}>
      {liked ? '❤️' : '🤍'} {likes} Likes
    </button>
  );
}
```

---

### Q28: Build a Simple Word and Character Counter.
```jsx
import { useState } from 'react';

function WordCounter() {
  const [text, setText] = useState('');

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <p>Words: {wordCount} | Characters: {text.length}</p>
    </div>
  );
}
```

---

### Q29: Build a dynamic Font Size Resizer (+ and - buttons).
```jsx
import { useState } from 'react';

function FontResizer() {
  const [fontSize, setFontSize] = useState(16);

  return (
    <div>
      <button onClick={() => setFontSize(s => Math.max(12, s - 2))}>A-</button>
      <button onClick={() => setFontSize(s => Math.min(32, s + 2))}>A+</button>
      <p style={{ fontSize: `${fontSize}px` }}>Sample dynamic reading text.</p>
    </div>
  );
}
```

---

### Q30: Build a Dismissible Alert Banner with an `[X]` button.
```jsx
import { useState } from 'react';

function AlertBanner({ message }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div style={{ background: '#fef3c7', padding: '10px 16px', display: 'flex', justifyContent: 'space-between' }}>
      <span>⚠️ {message}</span>
      <button onClick={() => setDismissed(true)} style={{ border: 'none', background: 'transparent' }}>✕</button>
    </div>
  );
}
```

---

### Q31: Sort an array of products by Price (Ascending/Descending).
```jsx
import { useState } from 'react';

function ProductSorter({ products }) {
  const [sortOrder, setSortOrder] = useState('asc');

  const sorted = [...products].sort((a, b) => 
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  );

  return (
    <div>
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort Price: {sortOrder.toUpperCase()}
      </button>
      <ul>
        {sorted.map(p => <li key={p.id}>{p.name} - ${p.price}</li>)}
      </ul>
    </div>
  );
}
```

---

### Q32: Prevent double-click form submissions by disabling on click.
```jsx
import { useState } from 'react';

function SafeSubmitButton({ onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleClick() {
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  }

  return (
    <button onClick={handleClick} disabled={isSubmitting}>
      {isSubmitting ? 'Processing...' : 'Submit Payment'}
    </button>
  );
}
```

---

### Q33: Real-Time Password Strength Indicator.
```jsx
function PasswordStrength({ password }) {
  let strength = 'Weak';
  if (password.length >= 8 && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
    strength = 'Strong';
  } else if (password.length >= 6) {
    strength = 'Medium';
  }

  const colors = { Weak: '#ef4444', Medium: '#eab308', Strong: '#22c55e' };

  return password ? <div style={{ color: colors[strength] }}>Strength: {strength}</div> : null;
}
```

---

### Q34: Build a Simple Step-by-Step Wizard Indicator (1 -> 2 -> 3).
```jsx
function StepIndicator({ currentStep, totalSteps = 3 }) {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {[...Array(totalSteps)].map((_, i) => (
        <div 
          key={i} 
          style={{ 
            width: 30, 
            height: 30, 
            borderRadius: '50%', 
            background: i + 1 <= currentStep ? '#4f46e5' : '#cbd5e1', 
            color: '#fff', 
            display: 'grid', 
            placeItems: 'center' 
          }}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
```

---

### Q35: Render a User Profile Card with Conditional Badges.
```jsx
function UserCard({ name, isOnline, isPro }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
      <h4>{name}</h4>
      <span style={{ color: isOnline ? 'green' : 'gray' }}>
        ● {isOnline ? 'Active Now' : 'Offline'}
      </span>
      {isPro && <span style={{ marginLeft: '8px', background: '#fef08a', padding: '2px 6px' }}>PRO</span>}
    </div>
  );
}
```

---

### Q36: Build a Simple Search Bar with a Clear `(X)` Button.
```jsx
import { useState } from 'react';

function ClearableInput() {
  const [text, setText] = useState('');

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Search..." />
      {text && (
        <button 
          onClick={() => setText('')} 
          style={{ position: 'absolute', right: 5, top: 4, border: 'none', background: 'transparent' }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
```

---

### Q37: Flash Notification Banner that disappears after 3 seconds.
```jsx
import { useState, useEffect } from 'react';

function FlashNotice({ message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;
  return <div style={{ background: '#bbf7d0', padding: '8px 12px' }}>{message}</div>;
}
```

---

### Q38: Build a Simple Pure CSS Dark Mode Toggle with State.
```jsx
import { useState } from 'react';

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const themeStyle = {
    background: darkMode ? '#0f172a' : '#ffffff',
    color: darkMode ? '#f8fafc' : '#0f172a',
    padding: '24px',
    minHeight: '150px'
  };

  return (
    <div style={themeStyle}>
      <h3>{darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}</h3>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>
    </div>
  );
}
```

---

### Q39: File Upload Input previewing an image thumbnail.
```jsx
import { useState } from 'react';

function ImagePreview() {
  const [preview, setPreview] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: 120, height: 120, marginTop: 10 }} />}
    </div>
  );
}
```

---

### Q40: Reusable Button with Dynamic Variants (`primary`, `danger`, `outline`).
```jsx
function Button({ variant = 'primary', children, ...props }) {
  const styles = {
    primary: { background: '#4f46e5', color: '#fff', border: 'none' },
    danger: { background: '#dc2626', color: '#fff', border: 'none' },
    outline: { background: 'transparent', color: '#4f46e5', border: '1px solid #4f46e5' }
  };

  return (
    <button style={{ padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', ...styles[variant] }} {...props}>
      {children}
    </button>
  );
}
```

---

### Q41: Highlight matching search terms inside text.
```jsx
function HighlightText({ text, query }) {
  if (!query) return <span>{text}</span>;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));

  return (
    <span>
      {parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? 
          <mark key={index} style={{ background: '#fef08a' }}>{part}</mark> : 
          part
      )}
    </span>
  );
}
```

---

### Q42: Radio Button Group for selecting a subscription plan.
```jsx
import { useState } from 'react';

function PlanSelector() {
  const [plan, setPlan] = useState('pro');

  return (
    <div>
      {['starter', 'pro', 'enterprise'].map(p => (
        <label key={p} style={{ marginRight: '16px' }}>
          <input 
            type="radio" 
            name="plan" 
            value={p} 
            checked={plan === p} 
            onChange={(e) => setPlan(e.target.value)} 
          /> {p.toUpperCase()}
        </label>
      ))}
      <p>Active Subscription: <strong>{plan}</strong></p>
    </div>
  );
}
```

---

### Q43: Simple Shopping Cart Item Quantity Modifier (+, -).
```jsx
import { useState } from 'react';

function CartItem({ name, price }) {
  const [qty, setQty] = useState(1);

  return (
    <div>
      <span>{name} (${price})</span>
      <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
      <span> {qty} </span>
      <button onClick={() => setQty(q => q + 1)}>+</button>
      <span> Total: ${qty * price}</span>
    </div>
  );
}
```

---

### Q44: Tooltip Hover Component using React State.
```jsx
import { useState } from 'react';

function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: '#333', color: '#fff', padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap', fontSize: '12px' }}>
          {text}
        </div>
      )}
    </div>
  );
}
```

---

### Q45: Currency Converter with live calculation (USD to EUR).
```jsx
import { useState } from 'react';

function CurrencyCalc({ rate = 0.92 }) {
  const [usd, setUsd] = useState('');

  return (
    <div>
      <input type="number" value={usd} onChange={(e) => setUsd(e.target.value)} placeholder="USD" />
      <p>EUR Equivalent: {usd ? (parseFloat(usd) * rate).toFixed(2) : '0.00'} €</p>
    </div>
  );
}
```

---

### Q46: Dynamic Table with Click-to-Sort Columns.
```jsx
import { useState } from 'react';

function SortableTable({ data }) {
  const [sortField, setSortField] = useState('name');

  const sorted = [...data].sort((a, b) => 
    typeof a[sortField] === 'string' ? a[sortField].localeCompare(b[sortField]) : a[sortField] - b[sortField]
  );

  return (
    <table border="1">
      <thead>
        <tr>
          <th onClick={() => setSortField('name')} style={{ cursor: 'pointer' }}>Name ⬍</th>
          <th onClick={() => setSortField('age')} style={{ cursor: 'pointer' }}>Age ⬍</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map(row => (
          <tr key={row.id}><td>{row.name}</td><td>{row.age}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

### Q47: Countdown to a specific target date/time.
```jsx
import { useState, useEffect } from 'react';

function TargetCountdown({ targetDate }) {
  const calculate = () => Math.max(0, Math.floor((new Date(targetDate) - new Date()) / 1000));
  const [secondsLeft, setSecondsLeft] = useState(calculate);

  useEffect(() => {
    const timer = setInterval(() => setSecondsLeft(calculate), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return <div>Event starts in: {secondsLeft} seconds</div>;
}
```

---

### Q48: Dynamic Form Input adding extra rows (+ Add Phone Number).
```jsx
import { useState } from 'react';

function MultiPhoneForm() {
  const [phones, setPhones] = useState(['']);

  const addField = () => setPhones([...phones, '']);
  const updateField = (idx, val) => {
    const updated = [...phones];
    updated[idx] = val;
    setPhones(updated);
  };

  return (
    <div>
      {phones.map((phone, i) => (
        <input key={i} value={phone} onChange={(e) => updateField(i, e.target.value)} placeholder={`Phone #${i+1}`} />
      ))}
      <button type="button" onClick={addField}>+ Add Another</button>
    </div>
  );
}
```

---

### Q49: Random Quote Generator with a "New Quote" button.
```jsx
import { useState } from 'react';

const QUOTES = [
  "Simplicity is prerequisite for reliability.",
  "Make it work, make it right, make it fast.",
  "First, solve the problem. Then, write the code."
];

function QuoteGenerator() {
  const [quote, setQuote] = useState(QUOTES[0]);

  function getRandom() {
    const nextQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(nextQuote);
  }

  return (
    <div>
      <blockquote>"{quote}"</blockquote>
      <button onClick={getRandom}>New Quote</button>
    </div>
  );
}
```

---

### Q50: Basic Pagination Buttons (Prev, Page 1 of 5, Next).
```jsx
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div>
      <button disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>Prev</button>
      <span> Page {currentPage} of {totalPages} </span>
      <button disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
  );
}
```

---

# Part 2: Intermediate & Advanced Coding Challenges (Questions 51 – 100)

### Q51: Fetch and display API data with Loading, Error, and Success states.
```jsx
import { useState, useEffect } from 'react';

function UserFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p>Error: {error}</p>;
  return <h3>{data.name} ({data.email})</h3>;
}
```

---

### Q52: Cancel in-flight API requests on unmount with `AbortController`.
```jsx
import { useState, useEffect } from 'react';

function SafeDataFetcher({ endpoint }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(endpoint, { signal: controller.signal })
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort(); // Cancel request if component unmounts!
  }, [endpoint]);

  return <div>{data ? JSON.stringify(data) : 'Fetching...'}</div>;
}
```

---

### Q53: Build a Custom Hook: `useDebounce(value, delay)`.
```jsx
import { useState, useEffect } from 'react';

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
```

---

### Q54: Build a Custom Hook: `useLocalStorage(key, initialValue)`.
```jsx
import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

---

### Q55: Build a Custom Hook: `useWindowSize()`.
```jsx
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
```

---

### Q56: Build a Custom Hook: `useOnClickOutside(ref, handler)`.
```jsx
import { useEffect } from 'react';

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    function listener(e) {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    }
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}
```

---

### Q57: Build a Custom Hook: `usePrevious(value)`.
```jsx
import { useRef, useEffect } from 'react';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
```

---

### Q58: Build a Custom Hook: `useOnlineStatus()`.
```jsx
import { useState, useEffect } from 'react';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
```

---

### Q59: Multi-input Controlled Form with a Generic Change Handler.
```jsx
import { useState } from 'react';

function GenericForm() {
  const [form, setForm] = useState({ name: '', email: '', role: 'eng' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  return (
    <form>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="eng">Engineering</option>
        <option value="des">Design</option>
      </select>
    </form>
  );
}
```

---

### Q60: Form Validation Schema with Real-Time Error Messages.
```jsx
import { useState } from 'react';

function ValidatedForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleBlur() {
    if (!email.includes('@')) {
      setError('Invalid email address format.');
    } else {
      setError('');
    }
  }

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleBlur} />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
}
```

---

### Q61: Optimistic UI Update (Add comment immediately, revert on failure).
```jsx
import { useState } from 'react';

function CommentList() {
  const [comments, setComments] = useState(['Great post!', 'Very helpful.']);

  async function addComment(text) {
    const previous = [...comments];
    // 1. Optimistically update UI
    setComments(prev => [...prev, text]);

    try {
      // 2. Mock API call
      const res = await fetch('/api/comments', { method: 'POST', body: text });
      if (!res.ok) throw new Error('Failed to post');
    } catch (err) {
      // 3. Revert on failure
      setComments(previous);
      alert('Could not save comment. Reverted.');
    }
  }

  return <div>{/* UI Rendering */}</div>;
}
```

---

### Q62: React Router DOM: Setting up BrowserRouter, Routes, and Route.
```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/about" element={<h2>About Page</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

### Q63: React Router DOM: Active Link Styling with `<NavLink>`.
```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <NavLink 
      to="/dashboard" 
      style={({ isActive }) => ({ 
        color: isActive ? '#4f46e5' : '#64748b', 
        fontWeight: isActive ? 'bold' : 'normal' 
      })}
    >
      Dashboard
    </NavLink>
  );
}
```

---

### Q64: React Router DOM: Dynamic Route with `useParams`.
```jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  return <h2>Showing details for User ID: {userId}</h2>;
}
// In Router: <Route path="/users/:userId" element={<UserProfile />} />
```

---

### Q65: React Router DOM: Programmatic Redirection with `useNavigate`.
```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  function handleLogin() {
    // Authenticate user...
    navigate('/dashboard'); // Redirect!
  }

  return <button onClick={handleLogin}>Log In</button>;
}
```

---

### Q66: React Router DOM: Catch-All 404 Route.
```jsx
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<div><h3>404 Not Found</h3><Link to="/">Home</Link></div>} />
    </Routes>
  );
}
```

---

### Q67: React Router DOM: Shared Layout with `<Outlet>`.
```jsx
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>App Navbar</header>
      <main><Outlet /></main>
      <footer>App Footer</footer>
    </div>
  );
}
// Route: <Route element={<Layout />}><Route path="/" element={<Home />} /></Route>
```

---

### Q68: React Router DOM: Protected Route Component.
```jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
```

---

### Q69: React Router DOM: Reading and Updating Search Query Parameters.
```jsx
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('query') || '';

  return (
    <div>
      <input value={q} onChange={(e) => setSearchParams({ query: e.target.value })} />
      <p>Filtering by query: {q}</p>
    </div>
  );
}
```

---

### Q70: Memoizing an expensive calculation with `useMemo`.
```jsx
import { useState, useMemo } from 'react';

function PrimeCalculator() {
  const [num, setNum] = useState(1000);
  const [dark, setDark] = useState(false);

  // Expensive calculation cached unless num changes
  const primeCount = useMemo(() => {
    let count = 0;
    for (let i = 2; i <= num; i++) {
      let isPrime = true;
      for (let j = 2; j * j <= i; j++) {
        if (i % j === 0) { isPrime = false; break; }
      }
      if (isPrime) count++;
    }
    return count;
  }, [num]);

  return <div>Primes up to {num}: {primeCount}</div>;
}
```

---

### Q71: Preventing function recreation with `useCallback` for a memoized child.
```jsx
import React, { useState, useCallback } from 'react';

const ChildButton = React.memo(({ onClick }) => {
  console.log("ChildButton rendered!");
  return <button onClick={onClick}>Click Child</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); // Reference is stable!

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Parent +1 ({count})</button>
      <ChildButton onClick={handleClick} />
    </div>
  );
}
```

---

### Q72: Measuring DOM element dimensions with `useRef` and `getBoundingClientRect`.
```jsx
import { useRef, useState, useEffect } from 'react';

function BoxMeasurer() {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (boxRef.current) {
      setWidth(boxRef.current.getBoundingClientRect().width);
    }
  }, []);

  return <div ref={boxRef} style={{ width: '50%' }}>Box Width: {width}px</div>;
}
```

---

### Q73: Rendering a Modal outside the parent DOM tree with `ReactDOM.createPortal`.
```jsx
import ReactDOM from 'react-dom';

function PortalModal({ children, isOpen }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }}>
      <div style={{ background: '#fff', padding: '20px' }}>{children}</div>
    </div>,
    document.body
  );
}
```

---

### Q74: Code Splitting with `React.lazy` and `<Suspense>`.
```jsx
import React, { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading Analytics Chart...</div>}>
      <HeavyChart />
    </Suspense>
  );
}
```

---

### Q75: Class-based Error Boundary Component.
```jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please reload.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

### Q76: Auto-saving a form draft to `localStorage` on typing.
```jsx
import { useState, useEffect } from 'react';

function AutoSaveDraft() {
  const [draft, setDraft] = useState(() => localStorage.getItem('user_draft') || '');

  useEffect(() => {
    localStorage.setItem('user_draft', draft);
  }, [draft]);

  return <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Draft auto-saves..." />;
}
```

---

### Q77: Polling an API every 5 seconds with automatic cleanup on unmount.
```jsx
import { useState, useEffect } from 'react';

function LiveStockPrice() {
  const [price, setPrice] = useState(150);

  useEffect(() => {
    const interval = setInterval(async () => {
      // Mock fetch
      setPrice(prev => +(prev + (Math.random() - 0.5) * 2).toFixed(2));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <div>Live Stock Price: ${price}</div>;
}
```

---

### Q78: Context API: Creating ThemeContext (Light/Dark) with Provider.
```jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

---

### Q79: Context API: Creating AuthContext (User, Login, Logout).
```jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

---

### Q80: Complex State Management using `useReducer` (Shopping Cart).
```jsx
import { useReducer } from 'react';

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter(item => item.id !== action.payload);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

function Cart() {
  const [items, dispatch] = useReducer(cartReducer, []);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'ADD', payload: { id: Date.now(), name: 'Book' } })}>Add</button>
      <button onClick={() => dispatch({ type: 'CLEAR' })}>Clear</button>
      <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
    </div>
  );
}
```

---

### Q81: Recursive Tree Component for Nested Comments/Folders.
```jsx
function TreeNode({ node }) {
  return (
    <div style={{ paddingLeft: '16px' }}>
      <span>📁 {node.name}</span>
      {node.children && node.children.map(child => (
        <TreeNode key={child.id} node={child} />
      ))}
    </div>
  );
}
```

---

### Q82: OTP (One-Time Password) 4-Digit Input with Auto-Advance.
```jsx
import { useRef } from 'react';

function OtpInput() {
  const inputs = [useRef(), useRef(), useRef(), useRef()];

  function handleChange(e, index) {
    if (e.target.value && index < 3) {
      inputs[index + 1].current.focus();
    }
  }

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {inputs.map((ref, i) => (
        <input 
          key={i} 
          ref={ref} 
          maxLength={1} 
          onChange={(e) => handleChange(e, i)} 
          style={{ width: '36px', height: '36px', textAlign: 'center' }} 
        />
      ))}
    </div>
  );
}
```

---

### Q83: Infinite Scroll "Load More" Pagination Button.
```jsx
import { useState } from 'react';

function LoadMoreList() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);

  function loadMore() {
    setLoading(true);
    setTimeout(() => {
      setItems(prev => [...prev, prev.length + 1, prev.length + 2]);
      setLoading(false);
    }, 1000);
  }

  return (
    <div>
      <ul>{items.map(i => <li key={i}>Item #{i}</li>)}</ul>
      <button onClick={loadMore} disabled={loading}>{loading ? 'Loading...' : 'Load More'}</button>
    </div>
  );
}
```

---

### Q84: Drag and Drop File Upload Area with Drag-Over Visuals.
```jsx
import { useState } from 'react';

function DropZone({ onFileDrop }) {
  const [isOver, setIsOver] = useState(false);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOver(false);
        if (e.dataTransfer.files[0]) onFileDrop(e.dataTransfer.files[0]);
      }}
      style={{ border: `2px dashed ${isOver ? '#4f46e5' : '#cbd5e1'}`, padding: 40, textAlign: 'center' }}
    >
      {isOver ? 'Drop file here!' : 'Drag & drop file here'}
    </div>
  );
}
```

---

### Q85: Responsive Collapsible Drawer with Backdrop Overlay.
```jsx
function Drawer({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40 }} />
      <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 280, background: '#fff', zIndex: 50, padding: 20 }}>
        <button onClick={onClose}>✕ Close</button>
        {children}
      </div>
    </>
  );
}
```

---

### Q86: Custom Toast Notification System.
```jsx
import { useState } from 'react';

function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  function addToast(msg) {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }

  return (
    <div>
      <button onClick={() => addToast('Operation succeeded!')}>Show Toast</button>
      <div style={{ position: 'fixed', bottom: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background: '#333', color: '#fff', padding: '8px 16px', borderRadius: 4 }}>
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### Q87: Star Rating Component with Hover Preview.
```jsx
import { useState } from 'react';

function StarRatingHover() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{ cursor: 'pointer', fontSize: 28, color: star <= (hover || rating) ? '#eab308' : '#cbd5e1' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
```

---

### Q88: Multi-Step Registration Form with State Preservation.
```jsx
import { useState } from 'react';

function MultiStep() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', plan: 'pro' });

  return (
    <div>
      {step === 1 && (
        <div>
          <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" />
          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" />
          <button onClick={() => setStep(1)}>Back</button>
          <button onClick={() => setStep(3)}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h4>Review: {formData.name} ({formData.email})</h4>
          <button onClick={() => alert('Submitted!')}>Confirm</button>
        </div>
      )}
    </div>
  );
}
```

---

### Q89: Pure CSS Shimmer Skeleton Loading Card.
```jsx
function SkeletonCard() {
  return (
    <div style={{ width: 280, padding: 16, border: '1px solid #e2e8f0', borderRadius: 8 }}>
      <div style={{ height: 16, width: '60%', background: '#e2e8f0', borderRadius: 4, marginBottom: 12 }} />
      <div style={{ height: 12, width: '100%', background: '#f1f5f9', borderRadius: 4, marginBottom: 8 }} />
      <div style={{ height: 12, width: '80%', background: '#f1f5f9', borderRadius: 4 }} />
    </div>
  );
}
```

---

### Q90: Re-orderable List (Move Up / Move Down buttons).
```jsx
import { useState } from 'react';

function ReorderList() {
  const [items, setItems] = useState(['Alpha', 'Beta', 'Gamma']);

  function move(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const copy = [...items];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setItems(copy);
  }

  return (
    <ul>
      {items.map((item, i) => (
        <li key={item}>
          {item} 
          <button onClick={() => move(i, -1)}>▲</button>
          <button onClick={() => move(i, 1)}>▼</button>
        </li>
      ))}
    </ul>
  );
}
```

---

### Q91: Dynamic Search Filter with Debounced Custom Hook.
```jsx
import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery) {
      console.log('Sending API search request for:', debouncedQuery);
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Live search..." />;
}
```

---

### Q92: Smooth Scroll to Anchor on button click using `scrollIntoView`.
```jsx
import { useRef } from 'react';

function ScrollSection() {
  const targetRef = useRef(null);

  return (
    <div>
      <button onClick={() => targetRef.current?.scrollIntoView({ behavior: 'smooth' })}>
        Jump to Pricing
      </button>
      <div style={{ height: '800px' }} />
      <section ref={targetRef} style={{ padding: 40, background: '#f1f5f9' }}>
        <h3>Pricing Plans</h3>
      </section>
    </div>
  );
}
```

---

### Q93: Custom Hook: `useToggle(initialState)`.
```jsx
import { useState, useCallback } from 'react';

function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState(prev => !prev), []);
  return [state, toggle];
}
```

---

### Q94: Breadcrumb Navigation dynamically parsed from pathname.
```jsx
import { Link, useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav>
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        return (
          <span key={name}>
            {' > '}
            <Link to={routeTo}>{name}</Link>
          </span>
        );
      })}
    </nav>
  );
}
```

---

### Q95: Multi-Select Filter with search inside the dropdown.
```jsx
import { useState } from 'react';

function SearchableMultiSelect({ options }) {
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState('');

  const filtered = options.filter(o => o.toLowerCase().includes(filter.toLowerCase()));

  const toggle = (item) => {
    setSelected(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, width: 220 }}>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter..." />
      {filtered.map(opt => (
        <div key={opt}>
          <label>
            <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} /> {opt}
          </label>
        </div>
      ))}
    </div>
  );
}
```

---

### Q96: Custom Hook: `useInterval(callback, delay)`.
```jsx
import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
```

---

### Q97: Responsive Dynamic Grid Component.
```jsx
function ResponsiveGrid({ items, minWidth = 240, gap = 16, renderItem }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`, gap: `${gap}px` }}>
      {items.map(renderItem)}
    </div>
  );
}
```

---

### Q98: Accessible Toggle Switch (`aria-checked` and keyboard navigation).
```jsx
function AccessibleSwitch({ checked, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          background: checked ? '#4f46e5' : '#cbd5e1',
          border: 'none',
          position: 'relative',
          padding: 2
        }}
      >
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', transform: checked ? 'translateX(20px)' : 'translateX(0)', transition: 'transform 0.2s' }} />
      </button>
    </label>
  );
}
```

---

### Q99: Simple Virtualized Window Scroller (Render only items in range).
```jsx
import { useState } from 'react';

function SimpleWindowList({ items, itemHeight = 35, windowHeight = 200 }) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(windowHeight / itemHeight);
  const visibleItems = items.slice(startIndex, startIndex + visibleCount);

  return (
    <div
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height: windowHeight, overflowY: 'auto', position: 'relative', border: '1px solid #ddd' }}
    >
      <div style={{ height: items.length * itemHeight }}>
        <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
          {visibleItems.map((item, idx) => (
            <div key={startIndex + idx} style={{ height: itemHeight }}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

### Q100: Reusable Custom Card Component with Compound Components (`Card.Header`, `Card.Body`, `Card.Footer`).
```jsx
function Card({ children }) {
  return <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>{children}</div>;
}

Card.Header = function CardHeader({ children }) {
  return <div style={{ background: '#f8fafc', padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>{children}</div>;
};

Card.Body = function CardBody({ children }) {
  return <div style={{ padding: '16px' }}>{children}</div>;
};

Card.Footer = function CardFooter({ children }) {
  return <div style={{ background: '#f8fafc', padding: '10px 16px', borderTop: '1px solid #e2e8f0', fontSize: '13px' }}>{children}</div>;
};

// Usage:
// <Card>
//   <Card.Header>User Profile</Card.Header>
//   <Card.Body>Engineering notes content</Card.Body>
//   <Card.Footer>Updated 2 hours ago</Card.Footer>
// </Card>
export default Card;
```
