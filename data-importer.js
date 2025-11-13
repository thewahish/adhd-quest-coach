// Quest Coach - Notion Data Importer
// This file contains all imported projects from Notion

const notionProjects = [
    {
        name: "Order webcam and speakers for client",
        category: "urgent",
        priority: "urgent",
        status: "active",
        xpValue: 50,
        icon: "🚨",
        notes: "Installation tomorrow - URGENT!",
        subtasks: []
    },
    {
        name: "Finish Rakan's Song project",
        category: "work",
        priority: "high",
        status: "active",
        xpValue: 100,
        icon: "🎵",
        notes: "High priority music project",
        subtasks: []
    },
    {
        name: "Ministry of Media Syria - Proposal",
        category: "urgent",
        priority: "urgent",
        status: "active",
        xpValue: 150,
        icon: "📄",
        notes: "Present to minister - HIGH PRIORITY",
        subtasks: [
            { title: "Research ministry needs", completed: false },
            { title: "Draft proposal document", completed: false },
            { title: "Create presentation slides", completed: false },
            { title: "Schedule meeting with minister", completed: false }
        ]
    },
    {
        name: "Ministry of Child Affairs Syria - Proposal",
        category: "work",
        priority: "medium",
        status: "planning",
        xpValue: 100,
        icon: "👶",
        notes: "Not urgent but needs attention",
        subtasks: [
            { title: "Understand project scope", completed: false },
            { title: "Draft initial proposal", completed: false }
        ]
    },
    {
        name: "Syria's Tale Song",
        category: "work",
        priority: "low",
        status: "awaiting_client",
        xpValue: 75,
        icon: "🎵",
        notes: "Project with Rima - awaiting client feedback",
        subtasks: []
    },
    {
        name: "Reels from Syria Lecture",
        category: "work",
        priority: "medium",
        status: "active",
        xpValue: 50,
        icon: "📹",
        notes: "Create social media content from lecture",
        subtasks: [
            { title: "Review lecture footage", completed: false },
            { title: "Select best clips", completed: false },
            { title: "Edit reels", completed: false },
            { title: "Post to social media", completed: false }
        ]
    },
    {
        name: "'I Can Do This' Song & Video Clip",
        category: "work",
        priority: "high",
        status: "awaiting_client",
        xpValue: 100,
        icon: "🎬",
        notes: "Project with Rima - 33% complete",
        subtasks: [
            { title: "Music production", completed: true },
            { title: "Mixing", completed: false },
            { title: "Video production", completed: false }
        ]
    },
    {
        name: "Quest Coach System Development",
        category: "work",
        priority: "high",
        status: "active",
        xpValue: 200,
        icon: "🎮",
        notes: "Building this gamified ADHD coaching system - ongoing maintenance",
        subtasks: [
            { title: "Basic MVP", completed: true },
            { title: "Voice input feature", completed: true },
            { title: "Notion import", completed: false },
            { title: "Sub-tasks support", completed: false },
            { title: "Mobile optimization", completed: false },
            { title: "Backend/sync", completed: false }
        ]
    },
    {
        name: "Follow up with CPA for K1s (Tax Returns)",
        category: "urgent",
        priority: "urgent",
        status: "active",
        xpValue: 75,
        icon: "📋",
        notes: "2 years of tax returns to file",
        subtasks: []
    },
    {
        name: "Ministry of Dakhiliyah (Internal Affairs) - PA System",
        category: "urgent",
        priority: "high",
        status: "active",
        xpValue: 150,
        icon: "🔊",
        notes: "Sound system project - 20% complete",
        subtasks: [
            { title: "Equipment study", completed: true },
            { title: "Awaiting client approval", completed: false },
            { title: "Installation logistics", completed: false },
            { title: "Go live", completed: false },
            { title: "Research vendors and prices", completed: false }
        ]
    },
    {
        name: "Follow up with Washington DC Networking Contacts",
        category: "work",
        priority: "medium",
        status: "active",
        xpValue: 50,
        icon: "🤝",
        notes: "Met Syria president - follow up with business cards",
        subtasks: []
    },
    {
        name: "Umayyad Mosque Acoustic Project",
        category: "work",
        priority: "medium",
        status: "planning",
        xpValue: 100,
        icon: "🕌",
        notes: "Reviving older project",
        subtasks: [
            { title: "Contact project stakeholders", completed: false },
            { title: "Check current status", completed: false },
            { title: "Assess next steps", completed: false }
        ]
    },
    {
        name: "Update Personal Website",
        category: "work",
        priority: "high",
        status: "active",
        xpValue: 75,
        icon: "🌐",
        notes: "Modernize and add call-to-action elements",
        subtasks: [
            { title: "Audit current site", completed: false },
            { title: "Design new layout", completed: false },
            { title: "Add CTAs", completed: false },
            { title: "Update portfolio", completed: false },
            { title: "Launch", completed: false }
        ]
    },
    // Additional projects from Notion
    {
        name: "Taxes Filing (2 years)",
        category: "urgent",
        priority: "urgent",
        status: "active",
        xpValue: 100,
        icon: "💰",
        notes: "Urgent - file 2 years of tax returns",
        subtasks: [
            { title: "Scan all papers", completed: false },
            { title: "Organize documents", completed: false },
            { title: "Submit to CPA", completed: false }
        ]
    },
    {
        name: "Nasheed Watani",
        category: "work",
        priority: "medium",
        status: "awaiting_client",
        xpValue: 75,
        icon: "🎵",
        notes: "33% complete - awaiting client",
        subtasks: [
            { title: "Music production", completed: true },
            { title: "Awaiting client feedback", completed: false },
            { title: "Start the project", completed: false }
        ]
    },
    {
        name: "Audio Courses Launch",
        category: "urgent",
        priority: "urgent",
        status: "active",
        xpValue: 200,
        icon: "🎓",
        notes: "High priority course launch",
        subtasks: [
            { title: "Payment gateway setup", completed: false },
            { title: "Marketing reels", completed: false },
            { title: "Design", completed: false },
            { title: "Lesson preparation", completed: false },
            { title: "Launch date announcement", completed: false },
            { title: "Go live", completed: false }
        ]
    },
    {
        name: "Abdulwareth Lahham Project",
        category: "urgent",
        priority: "high",
        status: "active",
        xpValue: 100,
        icon: "🎤",
        notes: "Urgent music project",
        subtasks: [
            { title: "Samples gathering", completed: false },
            { title: "Awaiting for approval", completed: false },
            { title: "Recording", completed: false },
            { title: "Delivery", completed: false }
        ]
    },
    {
        name: "Tamim and Tasnim Song 7",
        category: "work",
        priority: "high",
        status: "awaiting_client",
        xpValue: 100,
        icon: "👥",
        notes: "25% complete - awaiting client",
        subtasks: [
            { title: "Recording", completed: true },
            { title: "Animation", completed: false },
            { title: "Mixing", completed: false },
            { title: "Deliver to client", completed: false }
        ]
    }
];

// Export for use in the main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = notionProjects;
}
