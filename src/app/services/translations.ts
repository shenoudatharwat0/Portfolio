export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      services: 'Services',
      contact: 'Contact',
      langBtn: 'AR'
    },
    home: {
      name: 'Shenouda Tharwat',
      roles: ["Full Stack .NET Developer", "Backend Specialist", "Network Administrator"],
      description: 'Building scalable, secure, and high-performance applications with C# and SQL. Bridging the gap between software logic and infrastructure performance.',
      viewProjects: 'View Projects',
      getInTouch: 'Get In Touch',
      downloadResume: 'Download Resume'
    },
    about: {
      title: 'About Me',
      subtitle: 'Transforming Ideas Into Scalable Solutions',
      p1: '<strong>Results-oriented Full Stack .NET Developer</strong> with a strong foundation in network engineering and database management. I specialize in building scalable, multi-tenant architectures using C# and SQL Server.',
      p2: 'My unique background in networking allows me to bridge the gap between software logic and infrastructure performance, ensuring applications are not only functional but optimized for security, efficiency, and scalability.',
      p3: 'Currently focused on developing complex management platforms with robust backend logic, I bring a perspective that combines software development with infrastructure optimization to deliver enterprise-grade solutions.',
      education: 'Education',
      degree: 'AITU - Bachelor of Information Technology',
      duration: '2023 - 2027 (Expected)',
      resumeTitle: 'Professional Resume',
      resumeDesc: 'My expertise spans the entire development lifecycle from architecture to implementation.',
      downloadBtn: 'Download Full Resume'
    },
    skills: {
      title: 'Technical Expertise',
      subtitle: 'Tools & Technologies I Master',
      filters: {
        all: 'All Skills',
        database: 'Database',
        soft: 'Soft Skills'
      },
      categories: {
        backend: 'Backend Development',
        frontend: 'Frontend Development',
        database: 'Database Management',
        soft: 'Professional Skills'
      }
    },
    projects: {
      title: 'Selected Works',
      subtitle: 'Building Solutions That Make An Impact',
      portfolio: 'My Portfolio',
      filters: {
        all: 'All Projects',
        web: 'Web Apps',
        system: 'Systems'
      },
      techStack: 'Tech Stack',
      viewInGithub: 'View in GitHub',
      list: [
        {
          id: 1,
          category: 'system',
          title: 'EliteStay System',
          role: 'Full Stack Developer',
          img: 'assets/images/projects/elitestay.png',
          link: 'https://github.com',
          tech: 'C#, .NET Core, SQL Server, Entity Framework Core, RESTful APIs, RBAC',
          desc: 'A multi-tenant hotel management platform designed to support multiple hotel clients on a single instance with strict data isolation.',
          features: [
            '<strong>Multi-Tenancy:</strong> Scalable architecture supporting multiple clients securely.',
            '<strong>Database Architecture:</strong> Complex relational DB engineering in SQL Server.',
            '<strong>System Security:</strong> Robust backend logic with RBAC implementation.'
          ]
        },
        {
          id: 2,
          category: 'system',
          title: 'LedgerLock',
          role: 'Full Stack Developer',
          img: 'assets/images/projects/ledgerlock.png',
          link: 'https://github.com',
          tech: 'C#, .NET Core, Dapper, IdentityServer4, Cryptography',
          desc: 'Secure transaction and auditing system with advanced concurrency handling and enterprise-grade security features.',
          features: [
            '<strong>Concurrency Handling:</strong> Transaction engine preventing race conditions.',
            '<strong>Security & Compliance:</strong> AES-256 encryption for sensitive financial data.'
          ]
        },
        {
          id: 3,
          category: 'web',
          title: 'NetworkFlow Analyzer',
          role: 'Lead Developer',
          img: 'assets/images/projects/networkflow.png',
          link: 'https://github.com',
          tech: 'C#, ASP.NET Core, JavaScript, Chart.js, SQL Server',
          desc: 'Comprehensive network traffic analysis tool that visualizes data flow and identifies bottlenecks.',
          features: [
            '<strong>Real-time Visualization:</strong> Dynamic graphing using Chart.js.',
            '<strong>Data Processing:</strong> Efficient algorithms for large datasets with low latency.'
          ]
        }
      ]
    },
    services: {
      title: 'Services Offered',
      subtitle: 'How I Can Help Your Business',
      list: [
        {
          icon: 'fas fa-code',
          title: '.NET Application Development',
          desc: 'Building scalable, secure web applications using ASP.NET Core and modern frameworks with clean architecture principles.'
        },
        {
          icon: 'fas fa-database',
          title: 'Database Architecture',
          desc: 'Designing efficient database schemas, optimizing queries, and implementing data security best practices for peak performance.'
        },
        {
          icon: 'fas fa-project-diagram',
          title: 'API Development',
          desc: 'Creating robust RESTful APIs and integrating third-party services with comprehensive documentation and versioning.'
        },
        {
          icon: 'fas fa-sync-alt',
          title: 'Legacy System Modernization',
          desc: 'Upgrading legacy applications to modern .NET frameworks with improved architecture, performance, and maintainability.'
        },
        {
          icon: 'fas fa-network-wired',
          title: 'Infrastructure Optimization',
          desc: 'Leveraging network engineering expertise to optimize application infrastructure, security, and performance.'
        },
        {
          icon: 'fas fa-shield-alt',
          title: 'Security Implementation',
          desc: 'Implementing robust security measures including authentication, authorization, data encryption, and compliance standards.'
        }
      ]
    },
    contact: {
      title: 'Let\'s Connect',
      subtitle: 'Ready to collaborate on your next project?',
      getInTouch: 'Get In Touch',
      desc: 'I\'m currently open to new opportunities and collaborations. Whether you have a question, want to start a project together, or just want to connect, feel free to reach out!',
      email: 'Email',
      whatsapp: 'Whatsapp',
      connect: 'Connect with me',
      viewGithub: 'View my projects',
      form: {
        name: 'Full Name',
        namePlaceholder: 'Your name',
        email: 'Email Address',
        emailPlaceholder: 'Your email',
        subject: 'Subject',
        subjectPlaceholder: 'How can I help?',
        message: 'Message',
        messagePlaceholder: 'Tell me about your project...',
        send: 'Send Message'
      }
    },
    footer: {
      rights: 'All rights reserved.'
    },
    notFound: {
      title: 'Page Not Found',
      desc: 'The page you\'re looking for doesn\'t exist or has been moved. Let\'s get you back on track.'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'عني',
      skills: 'المهارات',
      projects: 'المشاريع',
      services: 'الخدمات',
      contact: 'تواصل معي',
      langBtn: 'EN'
    },
    home: {
      name: 'شنودة ثروت',
      roles: ["مطور Full Stack .NET", "متخصص Backend", "مسئول الشبكات"],
      description: 'بناء تطبيقات قابلة للتوسع وآمنة وعالية الأداء باستخدام C# و SQL. سد الفجوة بين منطق البرمجيات وأداء البنية التحتية بخبرة فريدة في التطوير والشبكات.',
      viewProjects: 'عرض المشاريع',
      getInTouch: 'تواصل معي',
      downloadResume: 'تحميل السيرة الذاتية'
    },
    about: {
      title: 'عنّي',
      subtitle: 'تحويل الأفكار إلى حلول برمجية قابلة للتطوير',
      p1: '<strong>مطور Full Stack .NET موجه بالنتائج</strong> مع أساس قوي في هندسة الشبكات وإدارة قواعد البيانات. أنا متخصص في بناء معماريات قابلة للتوسع ومتعددة المستأجرين (Multi-tenant) باستخدام C# و SQL Server.',
      p2: 'تسمح لي خلفيتي الفريدة في الشبكات بسد الفجوة بين منطق البرمجيات وأداء البنية التحتية، مما يضمن أن التطبيقات ليست وظيفية فحسب، بل محسنة للأمان والكفاءة وقابلية التوسع.',
      p3: 'أركز حاليًا على تطوير منصات إدارة معقدة ذات منطق خلفي (Backend) قوي، وأقدم منظورًا يجمع بين تطوير البرمجيات وتحسين البنية التحتية لتقديم حلول بمستوى المؤسسات.',
      education: 'التعليم',
      degree: 'AITU - بكالوريوس تكنولوجيا المعلومات',
      duration: '2023 - 2027 (متوقع)',
      resumeTitle: 'السيرة الذاتية المهنية',
      resumeDesc: 'تمتد خبرتي عبر دورة حياة التطوير بأكملها من الهندسة المعمارية وقواعد البيانات إلى التنفيذ.',
      downloadBtn: 'تحميل السيرة الذاتية'
    },
    skills: {
      title: 'الخبرة التقنية',
      subtitle: 'الأدوات والتقنيات التي أتقنها',
      filters: {
        all: 'كل المهارات',
        database: 'قواعد البيانات',
        soft: 'المهارات الشخصية'
      },
      categories: {
        backend: 'تطوير Backend',
        frontend: 'تطوير Frontend',
        database: 'إدارة قواعد البيانات',
        soft: 'المهارات المهنية'
      }
    },
    projects: {
      title: 'مشاريع مختارة',
      subtitle: 'بناء حلول ذات تأثير',
      portfolio: 'أعمالي',
      filters: {
        all: 'كل المشاريع',
        web: 'تطبيقات الويب',
        system: 'الأنظمة'
      },
      techStack: 'التقنيات',
      viewInGithub: 'عرض في GitHub',
      list: [
        {
          id: 1,
          category: 'system',
          title: 'نظام EliteStay',
          role: 'مطور Full Stack',
          img: 'assets/images/projects/elitestay.png',
          link: 'https://github.com',
          tech: 'C#, .NET Core, SQL Server, Entity Framework Core, RESTful APIs, RBAC',
          desc: 'منصة إدارة فنادق متعددة المستأجرين مصممة لدعم عدة عملاء فندقيين على مثيل واحد مع عزل صارم للبيانات وأمان عالٍ.',
          features: [
            '<strong>بنية متعددة المستأجرين:</strong> تصميم وتنفيذ بنية قابلة للتوسع تدعم عدة عملاء فندقيين.',
            '<strong>هندسة قواعد البيانات:</strong> هندسة قاعدة بيانات علائقية معقدة في SQL Server لإدارة المخزون الديناميكي.',
            '<strong>أمن النظام:</strong> بناء منطق خلفي قوي وصلاحيات تعتمد على الأدوار (RBAC).'
          ]
        },
        {
          id: 2,
          category: 'system',
          title: 'LedgerLock',
          role: 'مطور Full Stack',
          img: 'assets/images/projects/ledgerlock.png',
          link: 'https://github.com',
          tech: 'C#, .NET Core, Dapper, IdentityServer4, Cryptography',
          desc: 'نظام معاملات وتدقيق آمن مع معالجة متقدمة للتزامن وميزات أمان على مستوى المؤسسات.',
          features: [
            '<strong>معالجة التزامن:</strong> محرك معاملات قادر على التعامل مع التحويلات المتزامنة ومنع التضارب.',
            '<strong>الأمان والامتثال:</strong> تشفير AES-256 للبيانات المالية الحساسة وسجل تدقيق غير قابل للتغيير.'
          ]
        },
        {
          id: 3,
          category: 'web',
          title: 'NetworkFlow Analyzer',
          role: 'المطور الرئيسي',
          img: 'assets/images/projects/networkflow.png',
          link: 'https://github.com',
          tech: 'C#, ASP.NET Core, JavaScript, Chart.js, SQL Server',
          desc: 'أداة شاملة لتحليل حركة مرور الشبكة تقوم بتصور تدفق البيانات وتحديد الاختناقات.',
          features: [
            '<strong>تصور في الوقت الحقيقي:</strong> رسوم بيانية ديناميكية باستخدام Chart.js لعرض الأنماط.',
            '<strong>معالجة البيانات:</strong> خوارزميات فعالة لمعالجة كميات كبيرة من البيانات بأقل وقت استجابة.'
          ]
        }
      ]
    },
    services: {
      title: 'الخدمات المقدمة',
      subtitle: 'كيف يمكنني مساعدة عملك',
      list: [
        {
          icon: 'fas fa-code',
          title: 'تطوير تطبيقات .NET',
          desc: 'بناء تطبيقات ويب آمنة وقابلة للتوسع باستخدام ASP.NET Core وأطر العمل الحديثة.'
        },
        {
          icon: 'fas fa-database',
          title: 'هندسة قواعد البيانات',
          desc: 'تصميم مخططات قواعد بيانات فعالة وتحسين الاستعلامات للأداء العالي.'
        },
        {
          icon: 'fas fa-project-diagram',
          title: 'تطوير API',
          desc: 'إنشاء واجهات برمجة تطبيقات RESTful قوية ودمج خدمات الطرف الثالث مع التوثيق الكامل.'
        },
        {
          icon: 'fas fa-sync-alt',
          title: 'تحديث الأنظمة القديمة',
          desc: 'ترقية التطبيقات القديمة إلى أطر عمل .NET الحديثة مع تحسين البنية والأداء.'
        },
        {
          icon: 'fas fa-network-wired',
          title: 'تحسين البنية التحتية',
          desc: 'الاستفادة من خبرة هندسة الشبكات لتحسين أداء وأمان التطبيقات.'
        },
        {
          icon: 'fas fa-shield-alt',
          title: 'تطبيق الأمان',
          desc: 'تنفيذ تدابير أمنية قوية بما في ذلك المصادقة والتشفير والامتثال للمعايير.'
        }
      ]
    },
    contact: {
      title: 'لنبدأ العمل معاً',
      subtitle: 'جاهز للتعاون في مشروعك القادم؟',
      getInTouch: 'ابقى على تواصل',
      desc: 'أنا حاليًا منفتح لفرص جديدة وتعاونات. سواء كان لديك سؤال، أو تريد بدء مشروع معًا، أو مجرد التواصل، لا تتردد في مراسلتي!',
      email: 'البريد الإلكتروني',
      whatsapp: 'واتساب',
      connect: 'تواصل معي',
      viewGithub: 'عرض مشاريعي',
      form: {
        name: 'الاسم الكامل',
        namePlaceholder: 'اسمك',
        email: 'البريد الإلكتروني',
        emailPlaceholder: 'بريدك الإلكتروني',
        subject: 'الموضوع',
        subjectPlaceholder: 'كيف يمكنني مساعدتك؟',
        message: 'الرسالة',
        messagePlaceholder: 'أخبرني عن مشروعك...',
        send: 'إرسال الرسالة'
      }
    },
    footer: {
      rights: 'جميع الحقوق محفوظة.'
    },
    notFound: {
      title: 'الصفحة غير موجودة',
      desc: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نعود بك إلى المسار الصحيح.'
    }
  }
};
