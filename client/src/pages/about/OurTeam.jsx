import { ProfessionalsDetails } from '@/utils/ProfessionalsDetails'
import { Link } from 'react-router-dom';

function OurTeam() {
    // Extract necessary fields and map to boardMembers structure
    const boardMembers = ProfessionalsDetails.map(professional => ({
        userId: professional.userId,
        imgUrl: professional.profile.image,
        name: `${professional.profile.name}, ${professional.profile.role}`,
        qualification: professional.profile.fullTitle,
        description: `${professional.profile.quote} Known for: ${professional.profile.highlights.join(', ')}.`,
    }));
    console.log({ boardMembers })

    return (
        <div className="max-w-7xl mx-auto mt-10" data-aos="fade" data-aos-duration="1500">
            <div className="">
                <h1 className="text-lg font-semibold mb-2 h2 text-[var(--grey--900)]">Review Board Members</h1>
                <h1 className="text-2xl font-bold mb-4 text-[var(--black-color)]">Learn more about the experts who review our articles to make sure they are accurate and trustworthy.</h1>
                <p className="mb-4 text-base text-[var(--grey--800)]">
                    SukoonSphere Health Review Board has a team of board-qualified physicians and established mental health experts who ensure our content is high-quality and inclusive. The job of our experts who are compassionate resources that helps you prioritize your mental health and well-being.
                </p>
                <div className="mb-6 grid grid-cols-12 md:grid-cols-12 gap-6 text-left ">
                    {boardMembers.map((member, index) => (
                        <div className='col-span-3 bg-white p-4 rounded-[20px] space-y-4 shadow-lg hover:scale-110 transition-all duration-300' key={index} data-aos="zoom-in">
                            <div className='object-cover '>
                                <img src={member.imgUrl} alt={member.name} className="w-full h-full rounded-[10px] object-cover" />
                            </div>
                            <div className='space-y-2'>
                                <Link to={`/user-profile/${member.userId}`} >
                                    <h3 className="text-xl font-bold hover:text-[var(--ternery-hover)]">{member.name}</h3>
                                </Link>
                                <p>{member.qualification}

                                    <span className='ml-4'>
                                        <Link
                                            to={`/user-profile/${member.userId}`}
                                            key={member.userId}
                                            className="text-blue-600 hover:text-blue-800 "
                                        >
                                            Visit Profile
                                        </Link>
                                    </span>
                                </p>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default OurTeam;
