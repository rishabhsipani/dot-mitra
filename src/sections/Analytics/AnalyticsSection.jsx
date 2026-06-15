import { useEffect, useRef } from 'react';
import SectionHeader from '../../components/ui/SectionHeader';
import { gsap } from '../../utils/gsapConfig';
import './AnalyticsSection.css';

const analyticsStats = [
  { 
    value: '7.2M+', 
    title: 'Queries Processed',
    description: 'Instant answers delivered to citizens',
    start: 0,
    end: 7.2,
    decimals: 1,
    prefix: '',
    suffix: 'M+',
    useComma: false
  },
  { 
    value: '98.7%', 
    title: 'Response Accuracy',
    description: 'Highly reliable and verified engine',
    start: 50,
    end: 98.7,
    decimals: 1,
    prefix: '',
    suffix: '%',
    useComma: false
  },
  { 
    value: '1,700+', 
    title: 'Active Organizations',
    description: 'Across various departments and teams',
    start: 0,
    end: 1700,
    decimals: 0,
    prefix: '',
    suffix: '+',
    useComma: true
  },
  { 
    value: '< 2 Sec', 
    title: 'Response Time',
    description: 'Blazing fast real-time interaction',
    start: 10,
    end: 2,
    decimals: 0,
    prefix: '< ',
    suffix: ' Sec',
    useComma: false
  },
  { 
    value: '99.9%', 
    title: 'Platform Uptime',
    description: 'Enterprise-grade system availability',
    start: 80,
    end: 99.9,
    decimals: 1,
    prefix: '',
    suffix: '%',
    useComma: false
  },
  { 
    value: '250+ TB', 
    title: 'Secure Infrastructure',
    description: 'Encrypted sovereign knowledge base',
    start: 0,
    end: 250,
    decimals: 0,
    prefix: '',
    suffix: '+ TB',
    useComma: false
  },
  { 
    value: '15+', 
    title: 'Languages Supported',
    description: 'Hindi, English & regional languages',
    start: 0,
    end: 15,
    decimals: 0,
    prefix: '',
    suffix: '+',
    useComma: false
  },
  { 
    value: '24×7', 
    title: 'AI Availability',
    description: 'Continuous assistance for all queries',
    start: 0,
    end: 24,
    decimals: 0,
    prefix: '',
    suffix: '×7',
    useComma: false
  },
];

export default function AnalyticsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Subtle Container Parallax
      gsap.to(section, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      });

      // Scrubbed Entrance Stagger
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 20%',
          scrub: 1.5,
        }
      });

      enterTl
        .from(section.querySelector('.section-header'), { y: 40, opacity: 0 }, 0)
        .from(section.querySelectorAll('.analytics__card'), { y: 50, opacity: 0, stagger: 0.05 }, 0.1);

      // Number counter logic
      const stats = section.querySelectorAll('.analytics__stat-value');
      stats.forEach((statEl) => {
        const start = parseFloat(statEl.getAttribute('data-start')) || 0;
        const end = parseFloat(statEl.getAttribute('data-end')) || 0;
        const decimals = parseInt(statEl.getAttribute('data-decimals')) || 0;
        const prefix = statEl.getAttribute('data-prefix') || '';
        const suffix = statEl.getAttribute('data-suffix') || '';
        const useComma = statEl.getAttribute('data-comma') === 'true';

        const obj = { val: start };

        gsap.to(obj, {
          val: end,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            let formattedVal = obj.val.toFixed(decimals);
            if (useComma) {
              formattedVal = Math.floor(obj.val).toLocaleString();
            }
            statEl.textContent = `${prefix}${formattedVal}${suffix}`;
          }
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="analytics" className="analytics__section section--off-white">
      <div className="container">
        <SectionHeader
          title="Built for Scale & Adoption"
          highlightWord="Scale & Adoption"
          subtitle="Powering data-driven governance with enterprise-grade metrics"
          alignment="center"
        />

        <div className="analytics__grid">
          {analyticsStats.map((stat, i) => (
            <div key={stat.title} className="analytics__card">
              <span 
                className="analytics__stat-value"
                data-start={stat.start}
                data-end={stat.end}
                data-decimals={stat.decimals}
                data-prefix={stat.prefix}
                data-suffix={stat.suffix}
                data-comma={stat.useComma}
              >
                {stat.value}
              </span>
              <h3 className="analytics__stat-title">{stat.title}</h3>
              <p className="analytics__stat-desc">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
