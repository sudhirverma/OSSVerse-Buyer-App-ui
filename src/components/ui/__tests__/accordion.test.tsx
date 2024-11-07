import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion';

describe('Accordion Component', () => {
    it('renders without crashing', () => {
        render(
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Trigger 1</AccordionTrigger>
                    <AccordionContent>Content 1</AccordionContent>
                </AccordionItem>
            </Accordion>
        );
        expect(screen.getByText('Trigger 1')).toBeInTheDocument();
    });

    it('renders the trigger and content', () => {
        render(
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Trigger 1</AccordionTrigger>
                    <AccordionContent>Content 1</AccordionContent>
                </AccordionItem>
            </Accordion>
        );
        expect(screen.getByText('Trigger 1')).toBeInTheDocument();
    });




});
