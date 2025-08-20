// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initAnimations();
    initNumberAnimations();
    initScrollObserver();
});

// 动画配置
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// 初始化滚动动画
function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // 观察所有卡片元素
    document.querySelectorAll('.card, .advantage-card').forEach(el => {
        observer.observe(el);
    });
}

// 数字递增动画
function initNumberAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateNumber = (element, target, suffix = '') => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString() + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }
        }, 50);
    };

    // 创建数字动画观察者
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-target'));
                const suffix = element.textContent.includes('亿') ? '亿' : 
                              element.textContent.includes('+') ? '+' : '';
                
                animateNumber(element, target, suffix);
                numberObserver.unobserve(element); // 动画完成后停止观察
            }
        });
    });

    // 观察所有数字元素
    statNumbers.forEach(el => {
        numberObserver.observe(el);
    });
}

// 初始化基础动画
function initAnimations() {
    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 联系我们按钮功能
function contactUs() {
    const contactInfo = {
        name: "卢奕达",
        email: "17812089258@163.com",
        phone: "17812089258",
        wechat: "dadalu1106"
    };
    
    const message = `联系方式：\n\n` +
        `姓名：${contactInfo.name}\n` +
        `电话：${contactInfo.phone}\n` +
        `邮箱：${contactInfo.email}\n` +
        `微信：${contactInfo.wechat}`;
    
    alert(message);
    
    // 实际项目中可以替换为：
    // window.location.href = 'contact.html';
    // 或打开模态框
}

// 响应式导航（如果需要）
function initResponsiveNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 性能优化：图片懒加载
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 添加键盘导航支持
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// 错误处理
window.addEventListener('error', (e) => {
    console.error('JavaScript错误:', e.error);
});

// 性能监控
window.addEventListener('load', () => {
    // 记录页面加载时间
    const loadTime = performance.now();
    console.log(`页面加载完成，耗时: ${Math.round(loadTime)}ms`);
});

// 导出功能到全局作用域
window.contactUs = contactUs;