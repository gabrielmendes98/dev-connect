# Product Vision Document

**1. Product Vision**

Our vision is to create the digital ecosystem of choice for developers looking to accelerate their professional growth. DevConnect will be the platform where talent, knowledge, and opportunity meet, transforming the way developers collaborate, learn, and grow their careers.

**2. Mission**

To connect developers to projects, knowledge, and most importantly, people. We facilitate the exchange of experiences through dynamic portfolios, a collaborative knowledge base, and a structured mentoring program.

**3. Personas (Target Audience)**

- Júlia, the Student: She is at the beginning of her career, looking for her first projects to gain experience and needs guidance from more experienced developers to direct her studies.
- Carlos, the Junior: He already has market experience, wants to organize his personal projects to stand out in selection processes and start sharing his knowledge to strengthen his personal brand.
- Sofia, the Senior: She is an expert in her field, seeks to give back to the community, guiding new talents (mentoring) and consolidating herself as a technical reference through articles and discussions.

## Epics and Core Business Rules

Here we detail the core journeys and rules that govern the system.

### Epic 1: Identity and Professional Profile

The value here is to enable our users to build a reliable and complete professional identity.

- **User Journey:** A user should be able to create and manage their presence on the platform.
- **Business Rules:**
  - **R1.1 (Single Sign-Up):** A user’s email is their unique identifier on the platform. No two accounts can have the same email.
  - **R1.2 (Flexible Authentication):** A user can register using their email and a secure password, or opt for the convenience of using their Google account. A Google account can only be associated with a single DevConnect profile.
  - **R1.3 (Progressive Profile):** Upon registration, a basic profile is created. For a profile to be considered "Complete", the user must fill in essential information: name, a brief biography (elevator pitch) and at least 3 skills.
  - **R1.4 (Profile Visibility):** A profile only becomes public and visible to other users after reaching the "Complete" status. This ensures a minimum standard of quality on the platform.
  - **R1.5 (Unique Handle):** Each user must choose a unique username (handle, e.g. @sofia.tech), which will be used in their profile URL and for mentions.

### Epic 2: Dynamic Project Portfolio

The value is to give developers a live and practical way to demonstrate their skills, going beyond a static resume.

- **User Journey:** A user registers projects they are proud of, detailing what they have done and the technologies they have used.
- **Business Rules:**
  - **R2.1 (Project Ownership):** Every project must have one and only one "Owner".
  - **R2.2 (Collaboration):** The Owner of a project can invite other users of the platform to be "Collaborators". An invitation must be accepted for it to be effective.
  - **R2.3 (Editing Permissions):** Only the Owner and Collaborators can edit the information of a project.
  - **R2.4 (Project Status):** A project can be "Public" or "Private". Private projects are visible only to their Owner and Collaborators.

### Epic 3: Mentoring Connections

The value is to create a structured path for the exchange of experience, formalizing the relationship between those who want to learn and those who want to teach.

- **User Journey:** Julia (student) seeks a mentor. Sofia (senior) makes herself available and manages the requests she receives.
- **Business Rules:**
  - **R3.1 (Prerequisite to be a Mentor):** To become a "Mentor", the user must have a "Complete" profile and at least one "Public" project in their portfolio.
  - **R3.2 (Mentor Availability):** A Mentor can set their status as "Available for mentoring" or "Unavailable". Requests can only be sent to "Available" mentors.
  - **R3.3 (Request Lifecycle):** A mentoring request follows a clear lifecycle: Pending -> Accepted -> Declined -> Completed.
  - **R3.4 (Request Exclusivity):** A user cannot have more than one Pending Request for the same Mentor simultaneously.
  - **R3.5 (Mentee Limit):** A Mentor may set a maximum limit of simultaneous Mentees that he/she can accept. The system shall not allow him/her to accept new Requests if his/her limit has been reached.
  - **R3.6 (Mentoring Relationship):** Once a Request is Accepted, an active "Mentoring Connection" is established between the Mentor and the Mentee.

### Epic 4: Collaborative Knowledge Base

The value is to centralize technical discussion, allowing the knowledge generated on the platform to be searchable and benefit the entire community.

- **User Journey:** Carlos (mid-level) writes an article about a technology he is proficient in. Júlia (student) asks a question about a difficulty and Sofia (senior) answers it.
- **Business Rules:**
  - **R4.1 (Authorship):** Every post (article or question) must have an author.
  - **R4.2 (Mandatory Categorization):** Every post must be associated with at least one technology "Tag" to facilitate searching and organization.
  - **R4.3 (Moderation):** Content must follow community guidelines. Posts can be flagged by users for review.
  - **R4.4 (Answer Recognition):** The author of a question can mark one of the answers as the "Accepted Solution", highlighting it and recognizing who helped.
