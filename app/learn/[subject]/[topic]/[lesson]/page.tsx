import { getSubjectFromFS, getTopicFromFS } from "@/lib/content-registry";
import { notFound } from "next/navigation";
import LessonLoader from "@/components/LessonLoader";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string; lesson: string }>;
}) {
  const { subject: subjectId, topic: topicId, lesson: lessonId } = await params;

  const subject = await getSubjectFromFS(subjectId);
  const topic = await getTopicFromFS(subjectId, topicId);
  if (!subject || !topic) notFound();

  const lesson = topic.lessons.find((l) => l.id === lessonId);
  if (!lesson) notFound();



  const lessonIndex = topic.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = lessonIndex > 0 ? topic.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < topic.lessons.length - 1 ? topic.lessons[lessonIndex + 1] : null;

  return (
    <LessonLoader
      subjectId={subjectId}
      topicId={topicId}
      lessonId={lessonId}
      lessonName={lesson.name}
      subjectName={subject.name}
      topicName={topic.name}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
    />
  );
}
