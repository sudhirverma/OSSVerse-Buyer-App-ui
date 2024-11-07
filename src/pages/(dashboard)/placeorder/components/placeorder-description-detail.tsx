import { Card } from "@/components/ui/card";
import MDEditor from "@uiw/react-md-editor";
interface DescriptionDetailProps {
  description_details?: string;
  feature_enhancement?: string;
}

const DescriptionDetail = ({
  description_details,
  feature_enhancement,
}: DescriptionDetailProps) => {
  return (
    <>
      {!!description_details && (
        <Card className="px-5 py-6 mb-4" data-color-mode="light">
          <MDEditor.Markdown
            source={description_details}
            className="customer_markdown"
          />
        </Card>
      )}
      {!!feature_enhancement && (
        <Card className="px-5 py-6 mb-4" data-color-mode="light">
          <MDEditor.Markdown
            source={feature_enhancement}
            className="customer_markdown"
          />
        </Card>
      )}
    </>
  );
};

export default DescriptionDetail;
