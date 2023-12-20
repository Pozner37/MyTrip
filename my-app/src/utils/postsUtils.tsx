import { PostType } from "../components"

export const getPostsByCountry = (countryName: string): Array<PostType> => {
    // TODO: implement when api is ready
    // mock posts:
    return [
        {
            id: '1',
            country: 'Israel',
            description: 'Very good wars I recommend',
            username: 'pozner',
            comments: [{
                id: '37',
                comment: 'I love Rehovot!',
                postId: '1',
                username: 'yuvalHaBaayati'
            }]
        }
    ]
}

export const getPostImage = (postId: string) => {
    // TODO: implement when api is ready
    return 'https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/All_Destinations/AFME/Africa_-_Middle_East/Tel%20Aviv%20Guide%202023_HERO/Tel-Aviv-Travel-Guide-What%27s-New-in-Israel%27s-Capit.jpg?tr=w-1008%2Ch-567%2Cfo-auto'
}

export const getPostCommentAmount = (postId: string) => {
     // TODO: implement when api is ready
     return 12;
}
