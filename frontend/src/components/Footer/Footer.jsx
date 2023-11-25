import React from 'react'

function Footer() {
    return (
        <footer
            className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left border-t ">
            <div className=" text-PrimaryColors font-body font-bold text-xl p-6 text-center text-neutral-700 dark:text-neutral-200">
                © 2023 Copyright:
                <a
                    className="text-neutral-800 dark:text-neutral-400"
                    href="https://tw-elements.com/"
                >Dev by ISO</a
                >
            </div>
        </footer>
    )
}

export default Footer