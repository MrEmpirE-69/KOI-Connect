import PageContent from "../../../main/pagecontent/model/PageContent.js";

const insertPageContents = async () => {
  try {
    const pageContents = [
      {
        section: "About",
        slug: "about",
        title: "About KCMIT",
        content:
          "Under the affiliation of Tribhuvan University, the Kantipur College of Management and Information Technology (KCMIT), located in the center of Kathmandu, is committed to providing valuable technical education. KCMIT aims to offer Nepalese students with outstanding educational and job opportunities. Kantipur College of Management and Information Technology proudly offers Bachelor of Information Management (BIM), Bachelor of Business Administration (BBA), and Bachelor of Computer Application(BCA). The BIM course in Nepal is a solid mixture of management and IT, equipping students with the necessary skills for the modern business environment and ensuring they are ready for the current digital market. Our BBA program focuses on modern management practices and the application of IT in business, ensuring the graduates of KCMIT are well-prepared for the competitive market. Our college is recognized as a pioneer BIM college in Kathmandu, providing affordable and quality education. By the integration of practical knowledge with academic learning, KCMIT encourages an environment of academic excellence. Students benefit from the advanced computer labs, extensive library, and vibrant student clubs, which enhance the student's learning experience and career opportunities. At Kantipur College of Management and Information Technology, we believe in shaping the future leaders of Nepal through our comprehensive BBA, BIM, and BCA programs. Our commitment to excellence ensures that students receive the best education and are well-prepared to meet the challenges of the professional world. Join KCMIT to embark on a journey of academic excellence and career success. Explore our BCA, BBA, and BIM courses in Kathmandu and discover the diverse career opportunities they offer. Apply now and be a part of Nepal's leading educational institution.",
        image_url:
          "https://kcmit.edu.np/Uploads/teachers_day1Large20190717080419.webp",
      },
      {
        section: "History",
        slug: "history",
        title: "Our History",
        content:
          "In 2000, August, an innovative team of IT specialists and management educators established Kantipur College of Management and Information Technology. Having been educators for a long time, our founders wanted to offer Nepalese students access to excellent technical education. With the introduction of the Bachelor of Information Management (BIM), Bachelor of Computer Applications (BCA), and Bachelor of Business Administration (BBA) degrees, KCMIT in Kathmandu has become a leading university in the area.",
        image_url:
          "https://kcmit.edu.np/Uploads/teachers_day1Large20190717080419.webp",
      },
      {
        section: "Mission",
        slug: "misson",
        title: "Our Mission",
        content:
          "Our mission is to cultivate an environment that nurtures future business leaders and IT experts, instilling a commitment to excellence and a clear vision for the future. At KCMIT in Kathmandu, we are dedicated to contributing significantly to the nation-building process by equipping our graduates with the skills and knowledge necessary to drive change and innovation.",
        image_url:
          "https://kcmit.edu.np/Uploads/teachers_day1Large20190717080419.webp",
      },
      {
        section: "Vision",
        slug: "vision",
        title: "Our Vision",
        content:
          "Our vision is to equip graduates to take advantage of business and IT possibilities. By giving our students the skills and knowledge necessary to thrive in a competitive, worldwide economy, we hope to establish KCMIT as Nepal's premier BIM, BBA, and BCA college.",
        image_url:
          "https://kcmit.edu.np/Uploads/teachers_day1Large20190717080419.webp",
      },
      {
        section: "Principal Message",
        slug: "message-from-the-principal",
        title: "Message From the Principal",
        content:
          "For about two decade we have moved along steadily and left an imperishable imprint in the history of education, not only as the pioneer college of the BIM Program and a firm up-coming college of the BBA Program, but also in grooming young ladies and gentlemen to face different challenges of the 21st century. Our growth has definitely not been flamboyant, but mature and dignified as year after year, our students have proved themselves in all walks of life – be it higher studies or the job market – KCMITians have carved their way through in this world of cut-throat competition. When success stories of our alumni are heard, a sense of gratifying joy envelopes the reigning atmosphere. These laurels which we cherish today are the outcome of the endless effort of the entire college family- the management, faculty, the administrative staff, the domestic staff and the students themselves. Each one has endeavored to elate the position of KCMIT in the education map; surely this is an accomplishment of the team spirit prevalent amongst the college community. Though we have established ourselves as an abode of learning and an institution which cares for the ethical, professional and social growth of the youth, who have taken shelter under our wings, we still have to go a long way to reach the goal we have set before us. Prior to sending out BIM and BBA graduates into the big, wide, world we want to send good human beings who will uplift themselves above all petty bickerings and spread the message of love and understanding to one and all.",
        image_url:
          "https://kcmit.edu.np/Uploads/teachers_day1Large20190717080419.webp",
      },
      {
        section: "Director Message",
        slug: "message-from-the-managing-director",
        title: "Message From the Managing Director",
        content: "message from md",
        image_url:
          "https://kcmit.edu.np/Uploads/teachers_day1Large20190717080419.webp",
      },
    ];
    for (const pageContent of pageContents) {
      await PageContent.findOrCreate({
        where: { slug: pageContent.slug },
        defaults: pageContent,
      });
    }
    console.log("Page contents entries checked/created.");
  } catch (error) {
    console.error("Failed to create page contents", error);
  }
};

export default insertPageContents;
