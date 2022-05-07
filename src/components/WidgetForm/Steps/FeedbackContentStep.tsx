import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "./ScreenshotButton";

interface FeedbackSuccessStepProps {
  feedbackType: FeedbackType,
  onFeedbackRestartFeedback: () => void
  onFeedbackSent: () => void
}

export function FeedbackContentStep({feedbackType, onFeedbackRestartFeedback, onFeedbackSent}: FeedbackSuccessStepProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType]
  const [comment, setComment] = useState('')
  const [screenshot, setScreenshot] = useState<string | null>(null)

  function handleSubmitFeedback(evt: FormEvent) {
    evt.preventDefault()

    console.log({
      comment,
      screenshot
    })
    
    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartFeedback}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>
      
      <div className="flex py-8 gap-2 w-full">
        <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
          <textarea
            placeholder="Conte com detalhes o que está acontecendo"
            onChange={evt => setComment(evt.target.value)}
            className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          />

          <footer className="flex gap-2 mt-2">
            <ScreenshotButton screenshot={screenshot} onScreenshotTook={setScreenshot} /> 

            <button
              type="submit"
              disabled={!comment.length}
              className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex-justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            >
              Enviar feedback
            </button>
          </footer>
        </form>
      </div>
    </>
  )
}