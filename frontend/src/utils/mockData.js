export const mockUser = {
  _id: "u123",
  email: "student@elevatex.edu",
  role: "student",
};

export const mockStudentProfile = {
  _id: "sp123",
  user_id: "u123",
  full_name: "Arjun K. Malhotra",
  branch: "Artificial Intelligence & Data Science",
  cgpa: 9.42,
  skills: ["PyTorch", "TensorFlow", "Rust", "TypeScript", "Kubernetes", "C++", "Solidity", "AWS"],
  domain_interests: ["AI/ML", "Backend", "Neural Architectures"],
  projects: [
    {
      title: "Neural-Sync v2.4",
      tech_stack: ["Rust", "WebGPU"],
      description: "Distributed weight synchronization protocol for low-latency neural processing on heterogeneous edge devices.",
      status: "Deployed"
    },
    {
      title: "Kinetic-Flow Analysis",
      tech_stack: ["TypeScript", "D3.js"],
      description: "Real-time visualization engine for multi-agent training simulations using custom WebAssembly components.",
      status: "In Review"
    }
  ],
  placement_status: "Unplaced"
};

export const mockInternships = [
  {
    _id: "int1",
    student_id: "u123",
    company_name: "OmniSystems",
    role: "Security Architect Intern",
    duration_months: 3,
    status: "Approved",
    date: "Jan 2024 - Mar 2024"
  },
  {
    _id: "int2",
    student_id: "u123",
    company_name: "Vortex Dynamics",
    role: "Flow Analysis Assistant",
    duration_months: 2,
    status: "Pending",
    date: "Nov 2023 - Dec 2023"
  },
  {
    _id: "int3",
    student_id: "u123",
    company_name: "Kineto Logic",
    role: "Mechanical Lead Intern",
    duration_months: 3,
    status: "Rejected",
    date: "Aug 2023 - Oct 2023"
  }
];

export const mockNotifications = [
  {
    _id: "notif1",
    student_id: "u123",
    type: "Skill_Feedback",
    title: "Skill Gap Analyzed",
    message: "AI detected missing proficiency in 'Graph QL Federation' based on Silicon Valley requirements.",
    missing_skills: ["Graph QL Federation", "Distributed Systems"],
    action_item: "Engage with the 'Micro-Architectures' module to boost your match score for Silicon Valley tier roles by 14%.",
    is_read: false,
    date: "Just Now",
  },
  {
    _id: "notif2",
    student_id: "u123",
    type: "Invite",
    title: "New Match Identified",
    message: "Kinetic analysis suggests your recent 'Neural Graph' project aligns perfectly with their tech stack.",
    missing_skills: [],
    action_item: "Initiate Protocol to apply for Senior Neural Architect.",
    is_read: false,
    date: "2 hours ago",
    company: "Synthetix Labs",
    role: "Senior Neural Architect",
    matchScore: 92
  }
];
