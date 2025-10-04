import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface ProductFiltersProps {
  tags?: FilterOption[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  onClear: () => void;
}

export const ProductFilters = ({
  tags = [],
  selectedTags,
  onTagsChange,
  onClear,
}: ProductFiltersProps) => {
  const hasActiveFilters = selectedTags.length > 0;

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Filtres</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-auto p-0 text-accent">
            <X className="mr-1 h-3 w-3" />
            Réinitialiser
          </Button>
        )}
      </div>

      <Accordion type="single" collapsible defaultValue="tags" className="w-full">
        {tags.length > 0 && (
          <AccordionItem value="tags">
            <AccordionTrigger className="text-sm font-medium">Tags</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {tags.map((tag) => (
                  <div key={tag.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag.value}`}
                      checked={selectedTags.includes(tag.value)}
                      onCheckedChange={() => handleTagToggle(tag.value)}
                    />
                    <Label
                      htmlFor={`tag-${tag.value}`}
                      className="flex flex-1 cursor-pointer items-center justify-between text-sm font-normal"
                    >
                      <span>{tag.label}</span>
                      {tag.count !== undefined && (
                        <span className="text-xs text-muted-foreground">({tag.count})</span>
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};
