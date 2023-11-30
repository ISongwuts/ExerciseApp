import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const ContentLabel = () => {
    return (
        <p className=' text-PrimaryColors indent-16'>
            For years parents have espoused the health benefits of eating garlic bread with cheese to their
            children, with the food earning such an iconic status in our culture that kids will often dress
            up as warm, cheesy loaf for Halloween.
            But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
            springing up around the country.
        </p>
    )
}

function ArticlePage() {
    return (
        <div className="self-start h-[100%] w-[100%] flex justify-center p-10">
            <article class="prose lg:prose-xl font-body">
                <h1 className=' text-PrimaryColors'>Title</h1>
                <p className=' text-InactivePrimary hover:text-PrimaryColors'>
                    @Author
                </p>
                <p className=' text-PrimaryColors'>
                    description
                </p>
                <ContentLabel />
                <ContentLabel />
                <ContentLabel />
                <ContentLabel />
            </article>
        </div>

    )
}

export default ArticlePage