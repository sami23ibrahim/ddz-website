import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

gsap.registerPlugin(ScrollTrigger, Observer);

const ScrollHero = () => {
    const { t } = useTranslation();
    const component = useRef(null);
    const text1 = useRef(null);
    const imageContainer = useRef(null);
    const image2Ref = useRef(null);
    const text2 = useRef(null);
    const text2ContentA = useRef(null);
    const text2ContentB = useRef(null);
    const panel3 = useRef(null); // The new image panel
    const image4Ref = useRef(null); // The image that slides into panel3
    const panel4 = useRef(null); // The final panel for step 3
    
    // New refs for state 5
    const panel5 = useRef(null); // New image panel for state 5
    const image5Ref = useRef(null); // Image that slides into panel5
    const panel4ContentB = useRef(null); // Second content for panel4 (like text2ContentB)
    
    // New refs for state 6
    const panel6 = useRef(null); // New text panel for state 6 (like text2)
    const panel6ContentA = useRef(null); // Content A for panel6
    const panel6ContentB = useRef(null); // Content B for panel6
    const image6Ref = useRef(null); // New image that slides into panel5 for state 6
    
    // New refs for states 7-10 (copies of states 3-6)
    const panel7 = useRef(null); // Copy of panel3 (state 7 = copy of state 3)
    const image7Ref = useRef(null); // Copy of image4Ref
    const panel8 = useRef(null); // Copy of panel4 (state 8 = copy of state 4)
    const panel8ContentB = useRef(null); // Copy of panel4ContentB
    const panel9 = useRef(null); // Copy of panel5 (state 9 = copy of state 5)
    const image9Ref = useRef(null); // Copy of image5Ref/image6Ref
    const panel10 = useRef(null); // Copy of panel6 (state 10 = copy of state 6)
    const panel10ContentA = useRef(null); // Copy of panel6ContentA
    const panel10ContentB = useRef(null); // Copy of panel6ContentB
    const image10Ref = useRef(null); // Copy of image6Ref
    const panel11 = useRef(null); // The very final panel
    
    const [searchParams] = useSearchParams();
    const initialStep = parseInt(searchParams.get('step') || '0', 10);
    
    const currentStep = useRef(initialStep);
    const isAnimating = useRef(false);

    // Function to set elements to a specific step instantly
    const setToStep = (targetStep) => {
        // Reset all elements to initial positions first
        gsap.set(text1.current, { scale: 1, opacity: 1 });
        gsap.set(imageContainer.current, { left: 'calc(50%)', scale: 1, opacity: 1 });
        gsap.set(image2Ref.current, { yPercent: -150 });
        gsap.set(text2.current, { y: "150%", left: 'calc(49.5%)', scale: 1, opacity: 1 });
        gsap.set(text2ContentA.current, { yPercent: 0 });
        gsap.set(text2ContentB.current, { yPercent: -100 });
        gsap.set(panel3.current, { y: "150%", left: 'calc(50%)' });
        gsap.set(panel4.current, { y: "150%", left: 'calc(49.5%)', scale: 1, opacity: 1 });
        gsap.set(image4Ref.current, { yPercent: -150 });
        
        // Reset elements for states 5-6
        gsap.set(panel5.current, { y: "150%" });
        gsap.set(image5Ref.current, { yPercent: -150 });
        gsap.set(panel4ContentB.current, { yPercent: -100 });
        gsap.set(panel6.current, { y: "150%" });
        gsap.set(panel6ContentA.current, { yPercent: 0 });
        gsap.set(panel6ContentB.current, { yPercent: -100 });
        gsap.set(image6Ref.current, { yPercent: -150 });
        
        // Reset elements for states 7-10 elements
        gsap.set(panel7.current, { y: "150%" });
        gsap.set(image7Ref.current, { yPercent: -150 });
        gsap.set(panel8.current, { y: "150%" });
        gsap.set(panel8ContentB.current, { yPercent: -100 });
        gsap.set(panel9.current, { y: "150%" });
        gsap.set(image9Ref.current, { yPercent: -150 });
        gsap.set(panel10.current, { y: "150%" });
        gsap.set(panel10ContentA.current, { yPercent: 0 });
        gsap.set(panel10ContentB.current, { yPercent: -100 });
        gsap.set(image10Ref.current, { yPercent: -150 });
        gsap.set(panel11.current, { y: "150%" });

        // Apply the target step's final state
        switch (targetStep) {
            case 0:
                // Default state - already set above
                break;
            case 1:
                gsap.set(text1.current, { scale: 0.8, opacity: 0 });
                gsap.set(imageContainer.current, { left: '0.5rem' });
                gsap.set(image2Ref.current, { yPercent: 0 });
                gsap.set(text2.current, { y: "0%" });
                break;
            case 2:
                gsap.set(text1.current, { scale: 0.8, opacity: 0 });
                gsap.set(imageContainer.current, { left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image2Ref.current, { yPercent: 0 });
                gsap.set(text2.current, { y: "0%", left: '0.5rem' });
                gsap.set(text2ContentB.current, { yPercent: 0 });
                gsap.set(panel3.current, { y: "0%" });
                break;
            case 3:
                gsap.set(text1.current, { scale: 0.8, opacity: 0 });
                gsap.set(imageContainer.current, { left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image2Ref.current, { yPercent: 0 });
                gsap.set(text2.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(text2ContentB.current, { yPercent: 0 });
                gsap.set(panel3.current, { y: "0%", left: '0.5rem' });
                gsap.set(image4Ref.current, { yPercent: 0 });
                gsap.set(panel4.current, { y: "0%" });
                break;
            case 4:
                // State 4: Same as state 3 but with panel4 content changed and panel3 faded out
                gsap.set(text1.current, { scale: 0.8, opacity: 0 });
                gsap.set(imageContainer.current, { left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image2Ref.current, { yPercent: 0 });
                gsap.set(text2.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(text2ContentB.current, { yPercent: 0 });
                gsap.set(panel3.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 }); // Fade out panel3
                gsap.set(image4Ref.current, { yPercent: 0 });
                gsap.set(panel4.current, { y: "0%", left: '0.5rem' });
                gsap.set(panel4ContentB.current, { yPercent: 0 });
                gsap.set(panel5.current, { y: "0%" });
                break;
            case 5:
                // State 5: Image Left + Text Right (like state 1)
                gsap.set(text1.current, { scale: 0.8, opacity: 0 });
                gsap.set(imageContainer.current, { left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image2Ref.current, { yPercent: 0 });
                gsap.set(text2.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(text2ContentB.current, { yPercent: 0 });
                gsap.set(panel3.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image4Ref.current, { yPercent: 0 });
                gsap.set(panel4.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(panel4ContentB.current, { yPercent: 0 });
                gsap.set(panel5.current, { y: "0%", left: '0.5rem' });
                gsap.set(image6Ref.current, { yPercent: 0 });
                gsap.set(panel6.current, { y: "0%" });
                break;
            case 6:
                // State 6: Copy of state 2 pattern - panel5 should be hidden and panel6ContentB visible
                gsap.set(text1.current, { scale: 0.8, opacity: 0 });
                gsap.set(imageContainer.current, { left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image2Ref.current, { yPercent: 0 });
                gsap.set(text2.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(text2ContentB.current, { yPercent: 0 });
                gsap.set(panel3.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image4Ref.current, { yPercent: 0 });
                gsap.set(panel4.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(panel4ContentB.current, { yPercent: 0 });
                gsap.set(panel5.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 }); // Hide panel5
                gsap.set(image6Ref.current, { yPercent: 0 });
                gsap.set(panel6.current, { y: "0%", left: '0.5rem' });
                gsap.set(panel6ContentB.current, { yPercent: 0 }); // Show panel6ContentB
                gsap.set(panel7.current, { y: "0%" });
                break;
            case 7:
                // State 7: Copy of state 3
                gsap.set(text1.current, { scale: 0.8, opacity: 0 });
                gsap.set(imageContainer.current, { left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image2Ref.current, { yPercent: 0 });
                gsap.set(text2.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(text2ContentB.current, { yPercent: 0 });
                gsap.set(panel3.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image4Ref.current, { yPercent: 0 });
                gsap.set(panel4.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(panel4ContentB.current, { yPercent: 0 });
                gsap.set(panel5.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image6Ref.current, { yPercent: 0 });
                gsap.set(panel6.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(panel7.current, { y: "0%", left: '0.5rem' });
                gsap.set(image7Ref.current, { yPercent: 0 });
                gsap.set(panel8.current, { y: "0%" });
                break;
            case 8:
                // State 8: Copy of state 4 - panel7 should be faded out
                gsap.set(text1.current, { scale: 0.8, opacity: 0 });
                gsap.set(imageContainer.current, { left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image2Ref.current, { yPercent: 0 });
                gsap.set(text2.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(text2ContentB.current, { yPercent: 0 });
                gsap.set(panel3.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image4Ref.current, { yPercent: 0 });
                gsap.set(panel4.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(panel4ContentB.current, { yPercent: 0 });
                gsap.set(panel5.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image6Ref.current, { yPercent: 0 });
                gsap.set(panel6.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(panel7.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 }); // Fade out panel7
                gsap.set(image7Ref.current, { yPercent: 0 });
                gsap.set(panel8.current, { y: "0%", left: '0.5rem' });
                gsap.set(panel8ContentB.current, { yPercent: 0 });
                gsap.set(panel9.current, { y: "0%" });
                break;
            case 9:
                // State 9: Copy of state 5
                gsap.set(text1.current, { scale: 0.8, opacity: 0 });
                gsap.set(imageContainer.current, { left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image2Ref.current, { yPercent: 0 });
                gsap.set(text2.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(text2ContentB.current, { yPercent: 0 });
                gsap.set(panel3.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image4Ref.current, { yPercent: 0 });
                gsap.set(panel4.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(panel4ContentB.current, { yPercent: 0 });
                gsap.set(panel5.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image6Ref.current, { yPercent: 0 });
                gsap.set(panel6.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(panel7.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image7Ref.current, { yPercent: 0 });
                gsap.set(panel8.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(panel8ContentB.current, { yPercent: 0 });
                gsap.set(panel9.current, { y: "0%", left: '0.5rem' });
                gsap.set(image10Ref.current, { yPercent: 0 });
                gsap.set(panel10.current, { y: "0%" });
                break;
            case 10:
                // State 10: Copy of state 6
                gsap.set(text1.current, { scale: 0.8, opacity: 0 });
                gsap.set(imageContainer.current, { left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image2Ref.current, { yPercent: 0 });
                gsap.set(text2.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(text2ContentB.current, { yPercent: 0 });
                gsap.set(panel3.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image4Ref.current, { yPercent: 0 });
                gsap.set(panel4.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(panel4ContentB.current, { yPercent: 0 });
                gsap.set(panel5.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image6Ref.current, { yPercent: 0 });
                gsap.set(panel6.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(panel7.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image7Ref.current, { yPercent: 0 });
                gsap.set(panel8.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(panel8ContentB.current, { yPercent: 0 });
                gsap.set(panel9.current, { y: "0%", left: '0.5rem', scale: 0.8, opacity: 0 });
                gsap.set(image10Ref.current, { yPercent: 0 });
                gsap.set(panel10.current, { y: "0%", left: '0.5rem' });
                gsap.set(panel10ContentB.current, { yPercent: 0 });
                gsap.set(panel11.current, { y: "0%" });
                break;
        }
        currentStep.current = targetStep;
    };

    useLayoutEffect(() => {
        // Immediately set the initial states of the hidden panels to prevent any flash of content.
        gsap.set(image2Ref.current, { yPercent: -150 });
        gsap.set(text2.current, { y: "150%" });
        gsap.set(panel3.current, { y: "150%" });
        gsap.set(panel4.current, { y: "150%" });
        gsap.set(image4Ref.current, { yPercent: -150 });
        gsap.set(text2ContentB.current, { yPercent: -100 });
        
        // Set initial states for state 5-6 elements
        gsap.set(panel5.current, { y: "150%" });
        gsap.set(image5Ref.current, { yPercent: -150 });
        gsap.set(panel4ContentB.current, { yPercent: -100 });
        gsap.set(panel6.current, { y: "150%" });
        gsap.set(panel6ContentA.current, { yPercent: 0 });
        gsap.set(panel6ContentB.current, { yPercent: -100 });
        gsap.set(image6Ref.current, { yPercent: -150 });
        
        // Set initial states for state 7-10 elements
        gsap.set(panel7.current, { y: "150%" });
        gsap.set(image7Ref.current, { yPercent: -150 });
        gsap.set(panel8.current, { y: "150%" });
        gsap.set(panel8ContentB.current, { yPercent: -100 });
        gsap.set(panel9.current, { y: "150%" });
        gsap.set(image9Ref.current, { yPercent: -150 });
        gsap.set(panel10.current, { y: "150%" });
        gsap.set(panel10ContentA.current, { yPercent: 0 });
        gsap.set(panel10ContentB.current, { yPercent: -100 });
        gsap.set(image10Ref.current, { yPercent: -150 });
        gsap.set(panel11.current, { y: "150%" });

        // Set to initial step if specified in URL - do this immediately after initial setup
        if (initialStep > 0 && initialStep <= 10) {
            // Use requestAnimationFrame to ensure DOM is ready but avoid flash
            requestAnimationFrame(() => setToStep(initialStep));
        }

        const steps = [
            {}, // Step 0 is the initial state
            // Step 1: text1/imageContainer -> imageContainer/text2
            {
                forward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 1; }
                    });
                    tl.to(text1.current, { scale: 0.8, opacity: 0, ease: 'power2.inOut', duration: 0.8 })
                      .to(imageContainer.current, { left: '0.5rem', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(image2Ref.current, { yPercent: 0, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(text2.current, { y: "0%", ease: 'power2.inOut', duration: 0.6 }, "<");
                },
                backward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 0; }
                    });
                     tl.to(text1.current, { scale: 1, opacity: 1, ease: 'power2.inOut', duration: 0.8 })
                       .to(imageContainer.current, { left: 'calc(50%)', ease: 'power2.inOut', duration: 0.8 }, "<")
                       .to(image2Ref.current, { yPercent: -150, ease: 'power2.inOut', duration: 0.8 }, "<")
                       .to(text2.current, { y: "150%", ease: 'power2.inOut', duration: 0.6 }, "<");
                }
            },
            // Step 2: imageContainer/text2 -> text2/panel3
            {
                forward: () => {
                     const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 2; }
                    });
                    tl.to(imageContainer.current, { scale: 0.8, opacity: 0, ease: 'power2.inOut', duration: 0.8 })
                      .to(text2.current, { left: '0.5rem', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(text2ContentB.current, { yPercent: 0, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .fromTo(panel3.current, { y: "150%" }, { y: "0%", ease: 'power2.inOut', duration: 0.6 }, "<");
                },
                backward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 1; }
                    });
                    tl.to(imageContainer.current, { scale: 1, opacity: 1, ease: 'power2.inOut', duration: 0.8 })
                      .to(text2.current, { left: 'calc(49.5%)', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(text2ContentB.current, { yPercent: -100, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel3.current, { y: "150%", ease: 'power2.inOut', duration: 0.6 }, "<");
                }
            },
            // Step 3: text2/panel3 -> panel3/panel4
            {
                forward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 3; }
                    });
                    tl.to(text2.current, { scale: 0.8, opacity: 0, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel3.current, { left: '0.5rem', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(image4Ref.current, { yPercent: 0, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel4.current, { y: "0%", ease: 'power2.inOut', duration: 0.6 }, "<");
                },
                backward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 2; }
                    });
                     tl.to(text2.current, { scale: 1, opacity: 1, ease: 'power2.inOut', duration: 0.8 })
                       .to(panel3.current, { left: 'calc(50%)', ease: 'power2.inOut', duration: 0.8 }, "<")
                       .to(image4Ref.current, { yPercent: -150, ease: 'power2.inOut', duration: 0.8 }, "<")
                       .to(panel4.current, { y: "150%", ease: 'power2.inOut', duration: 0.6 }, "<");
                }
            },
            // Step 4: panel3/panel4 -> panel4/panel5 (copying state 2→state 3 pattern)
            {
                forward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 4; }
                    });
                    // Fade out panel3 image, move panel4 left and bring new panel up
                    tl.to(panel3.current, { scale: 0.8, opacity: 0, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel4.current, { left: '0.5rem', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel4ContentB.current, { yPercent: 0, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .fromTo(panel5.current, { y: "150%" }, { y: "0%", ease: 'power2.inOut', duration: 0.6 }, "<");
                },
                backward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 3; }
                    });
                    // Restore panel3 and move panel4 back
                    tl.to(panel3.current, { scale: 1, opacity: 1, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel4.current, { left: 'calc(49.5%)', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel4ContentB.current, { yPercent: -100, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel5.current, { y: "150%", ease: 'power2.inOut', duration: 0.6 }, "<");
                }
            },
            // Step 5: panel4/panel5 -> panel5/panel6 (copying state 1→state 2 pattern)
            {
                forward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 5; }
                    });
                    tl.to(panel4.current, { scale: 0.8, opacity: 0, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel5.current, { left: '0.5rem', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(image6Ref.current, { yPercent: 0, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel6.current, { y: "0%", ease: 'power2.inOut', duration: 0.6 }, "<");
                },
                backward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 4; }
                    });
                                         tl.to(panel4.current, { scale: 1, opacity: 1, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel5.current, { left: 'calc(50%)', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(image6Ref.current, { yPercent: -150, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel6.current, { y: "150%", ease: 'power2.inOut', duration: 0.6 }, "<");
                }
            },
            // Step 6: panel5/panel6 -> panel6/panel7 (copying state 2→state 3 pattern)
            {
                forward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 6; }
                    });
                    // Hide panel5, move panel6 left with content change and bring new panel up
                    tl.to(panel5.current, { scale: 0.8, opacity: 0, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel6.current, { left: '0.5rem', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel6ContentB.current, { yPercent: 0, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .fromTo(panel7.current, { y: "150%" }, { y: "0%", ease: 'power2.inOut', duration: 0.6 }, "<");
                },
                backward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 5; }
                    });
                    tl.to(panel5.current, { scale: 1, opacity: 1, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel6.current, { left: 'calc(49.5%)', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel6ContentB.current, { yPercent: -100, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel7.current, { y: "150%", ease: 'power2.inOut', duration: 0.6 }, "<");
                }
            },
            // Step 7: panel6/panel7 -> panel7/panel8 (copying state 3→state 4 pattern)
            {
                forward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 7; }
                    });
                    tl.to(panel6.current, { scale: 0.8, opacity: 0, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel7.current, { left: '0.5rem', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(image7Ref.current, { yPercent: 0, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel8.current, { y: "0%", ease: 'power2.inOut', duration: 0.6 }, "<");
                },
                backward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 6; }
                    });
                    tl.to(panel6.current, { scale: 1, opacity: 1, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel7.current, { left: 'calc(50%)', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(image7Ref.current, { yPercent: -150, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel8.current, { y: "150%", ease: 'power2.inOut', duration: 0.6 }, "<");
                }
            },
            // Step 8: panel7/panel8 -> panel8/panel9 (copying state 4→state 5 pattern)
            {
                forward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 8; }
                    });
                    // Fade out panel7 image, move panel8 left and bring new panel up
                    tl.to(panel7.current, { scale: 0.8, opacity: 0, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel8.current, { left: '0.5rem', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel8ContentB.current, { yPercent: 0, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .fromTo(panel9.current, { y: "150%" }, { y: "0%", ease: 'power2.inOut', duration: 0.6 }, "<");
                },
                backward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 7; }
                    });
                    tl.to(panel7.current, { scale: 1, opacity: 1, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel8.current, { left: 'calc(49.5%)', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel8ContentB.current, { yPercent: -100, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel9.current, { y: "150%", ease: 'power2.inOut', duration: 0.6 }, "<");
                }
            },
            // Step 9: panel8/panel9 -> panel9/panel10 (copying state 5→state 6 pattern)
            {
                forward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 9; }
                    });
                    tl.to(panel8.current, { scale: 0.8, opacity: 0, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel9.current, { left: '0.5rem', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(image10Ref.current, { yPercent: 0, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel10.current, { y: "0%", ease: 'power2.inOut', duration: 0.6 }, "<");
                },
                backward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 8; }
                    });
                    tl.to(panel8.current, { scale: 1, opacity: 1, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel9.current, { left: 'calc(50%)', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(image10Ref.current, { yPercent: -150, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel10.current, { y: "150%", ease: 'power2.inOut', duration: 0.6 }, "<");
                }
            },
            // Step 10: The final animation to reveal state 11
            {
                forward: () => {
            const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 10; }
                    });
                    tl.to(panel9.current, { scale: 0.8, opacity: 0, ease: 'power2.inOut', duration: 0.8 })
                      .to(panel10.current, { left: '0.5rem', ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel10ContentB.current, { yPercent: 0, ease: 'power2.inOut', duration: 0.8 }, "<")
                      .to(panel11.current, { y: "0%", ease: 'power2.inOut', duration: 0.6 }, "<");
                },
                backward: () => {
                    const tl = gsap.timeline({
                        onStart: () => { isAnimating.current = true; },
                        onComplete: () => { isAnimating.current = false; currentStep.current = 9; }
                    });
                    tl.to(panel9.current, { scale: 1, opacity: 1, ease: 'power2.inOut', duration: 0.8 })
                       .to(panel10.current, { left: 'calc(49.5%)', ease: 'power2.inOut', duration: 0.8 }, "<")
                       .to(panel10ContentB.current, { yPercent: -100, ease: 'power2.inOut', duration: 0.8 }, "<")
                       .to(panel11.current, { y: "150%", ease: 'power2.inOut', duration: 0.6 }, "<");
                }
            }
        ];

        let observer = Observer.create({
            target: component.current,
            type: 'wheel,touch,pointer',
            preventDefault: true,
            onDown: () => {
                if (isAnimating.current) return;
                if (currentStep.current < steps.length - 1) {
                    steps[currentStep.current + 1].forward();
                }
            },
            onUp: () => {
                if (isAnimating.current) return;
                if (currentStep.current > 0) {
                    steps[currentStep.current].backward();
                }
                },
            });
            
        observer.disable();

        let pinTrigger = ScrollTrigger.create({
            trigger: component.current,
            pin: true,
            start: 'top top',
            end: `+=${(steps.length - 1) * 1000}`,
            onEnter: () => observer.enable(),
            onLeave: () => observer.disable(),
            onEnterBack: () => observer.enable(),
            onLeaveBack: () => observer.disable(),
        });

        return () => {
            pinTrigger.kill();
            observer.kill();
        };
    }, []);

    return (
        <div ref={component} className="h-screen w-screen overflow-hidden relative pt-2 pr-8 pb-2 pl-2 bg-[#e8e2d4]">
            {/* Panel 1: Initial Text */}
            <div ref={text1} className="absolute top-2 left-2 w-[calc(50%-1rem)] h-[calc(100%-1rem)] flex flex-col pt-12 px-12 bg-[#422f40] rounded-[3rem]">
                <h1 className="text-4xl font-bold text-[#e8e2d4]">{t('services_grid.items.item1')}</h1>
                <div className="mt-4 text-lg text-[#e8e2d4]">
                    <ReactMarkdown>{t('services_grid.items.item1_desc')}</ReactMarkdown>
                </div>
            </div>

            {/* Panel 2: Image */}
            <div ref={imageContainer} className="absolute top-2 left-[calc(50%)] w-[calc(50%-1.5rem)] h-[calc(100%-1rem)] z-10 rounded-[3rem] overflow-hidden">
                <div className="relative w-full h-full">
                    <img src="../Assets/g3.png" alt="A person with decorative braces and a pearl necklace." className="absolute w-full h-full object-cover" />
                    <img ref={image2Ref} src="../Assets/g.webp" alt="A person with decorative braces, close-up." className="absolute w-full h-full object-cover" />
                </div>
            </div>
            
            {/* Panel 3: Text Panel (moves right to left) */}
            <div ref={text2} className="absolute top-2 left-[calc(49.5%)] w-[calc(50%-1rem)] h-[calc(100%-1rem)] bg-[#422f40] rounded-[3rem] z-20 overflow-hidden">
                {/* Content Set A */}
                <div ref={text2ContentA} className="absolute inset-0 flex flex-col pt-12 px-12">
                    <h1 className="text-4xl font-bold text-[#e8e2d4]">{t('services_grid.items.item2')}</h1>
                    <div className="markdown mt-4 text-lg text-[#e8e2d4]">
                        <ReactMarkdown>{t('services_grid.items.item2_desc')}</ReactMarkdown>
                    </div>
                </div>
                {/* Content Set B (initially hidden) */}
                <div ref={text2ContentB} className="absolute inset-0 flex flex-col pt-12 px-12 bg-[#422f40] rounded-[3rem]">
                    <h1 className="text-4xl font-bold text-[#e8e2d4]">{t('services_grid.items.item3')}</h1>
                    <div className="markdown mt-4 text-lg text-[#e8e2d4]">
                        <ReactMarkdown>{t('services_grid.items.item3_desc')}</ReactMarkdown>
                    </div>
                </div>
            </div>

            {/* Panel 4: New Image Panel (slides up) */}
            <div ref={panel3} className="absolute top-2 left-[calc(50%)] w-[calc(50%-1.5rem)] h-[calc(100%-1rem)] rounded-[3rem] z-30 overflow-hidden">
                <div className="relative w-full h-full">
                    <img src="../Assets/tech.jpg" alt="Dental technology" className="absolute w-full h-full object-cover" />
                    <img ref={image4Ref} src="../Assets/g.webp" alt="A person with decorative braces, close-up." className="absolute w-full h-full object-cover" />
                </div>
            </div>

            {/* Panel 5: Text Panel with dual content (like text2) */}
            <div ref={panel4} className="absolute top-2 left-[calc(49.5%)] w-[calc(50%-1rem)] h-[calc(100%-1rem)] bg-[#422f40] rounded-[3rem] z-40 overflow-hidden">
                {/* Content Set A (default) */}
                <div className="absolute inset-0 flex flex-col pt-12 px-12">
                     <h1 className="text-4xl font-bold text-[#e8e2d4]">{t('services_grid.items.item4')}</h1>
                    <div className="markdown mt-4 text-lg text-[#e8e2d4]">
                        <ReactMarkdown>{t('services_grid.items.item4_desc')}</ReactMarkdown>
                    </div>
                </div>
                {/* Content Set B (initially hidden) - this is state 5 */}
                <div ref={panel4ContentB} className="absolute inset-0 flex flex-col pt-12 px-12 bg-[#422f40] rounded-[3rem]">
                    <h1 className="text-4xl font-bold text-[#e8e2d4]">{t('services_grid.items.item5')}</h1>
                    <div className="markdown mt-4 text-lg text-[#e8e2d4]">
                        <ReactMarkdown>{t('services_grid.items.item5_desc')}</ReactMarkdown>
                    </div>
                </div>
            </div>

            {/* Panel 6: New Image Panel (slides up for state 5) */}
            <div ref={panel5} className="absolute top-2 left-[calc(50%)] w-[calc(50%-1.5rem)] h-[calc(100%-1rem)] rounded-[3rem] z-50 overflow-hidden">
                <div className="relative w-full h-full">
                    <img src="../Assets/tech.jpg" alt="Dental technology" className="absolute w-full h-full object-cover" />
                    <img ref={image5Ref} src="../Assets/g.webp" alt="A person with decorative braces, close-up." className="absolute w-full h-full object-cover" />
                    <img ref={image6Ref} src="../Assets/g3.png" alt="Another dental image" className="absolute w-full h-full object-cover" />
                </div>
            </div>

            {/* Panel 7: Text Panel for state 6 (like text2) */}
            <div ref={panel6} className="absolute top-2 left-[calc(49.5%)] w-[calc(50%-1rem)] h-[calc(100%-1rem)] bg-[#422f40] rounded-[3rem] z-40 overflow-hidden">
                {/* Content Set A */}
                <div ref={panel6ContentA} className="absolute inset-0 flex flex-col pt-12 px-12">
                    <h1 className="text-4xl font-bold text-[#e8e2d4]">{t('services_grid.items.item6')}</h1>
                    <div className="markdown mt-4 text-lg text-[#e8e2d4]">
                        <ReactMarkdown>{t('services_grid.items.item6_desc')}</ReactMarkdown>
                    </div>
                </div>
                {/* Content Set B (initially hidden) */}
                <div ref={panel6ContentB} className="absolute inset-0 flex flex-col pt-12 px-12 bg-[#422f40] rounded-[3rem]">
                    <h1 className="text-4xl font-bold text-[#e8e2d4]">{t('services_grid.items.item7')}</h1>
                    <div className="markdown mt-4 text-lg text-[#e8e2d4]">
                        <ReactMarkdown>{t('services_grid.items.item7_desc')}</ReactMarkdown>
                    </div>
                </div>
            </div>

            {/* Panel 8: Image Panel for state 7 (copy of panel3) */}
            <div ref={panel7} className="absolute top-2 left-[calc(50%)] w-[calc(50%-1.5rem)] h-[calc(100%-1rem)] rounded-[3rem] z-30 overflow-hidden">
                <div className="relative w-full h-full">
                    <img src="../Assets/tech.jpg" alt="Dental technology" className="absolute w-full h-full object-cover" />
                    <img ref={image7Ref} src="../Assets/g.webp" alt="A person with decorative braces, close-up." className="absolute w-full h-full object-cover" />
                </div>
            </div>

            {/* Panel 9: Text Panel for state 8 (copy of panel4) */}
            <div ref={panel8} className="absolute top-2 left-[calc(49.5%)] w-[calc(50%-1rem)] h-[calc(100%-1rem)] bg-[#422f40] rounded-[3rem] z-40 overflow-hidden">
                {/* Content Set A (default) */}
                <div className="absolute inset-0 flex flex-col pt-12 px-12">
                     <h1 className="text-4xl font-bold text-[#e8e2d4]">{t('services_grid.items.item8')}</h1>
                    <div className="markdown mt-4 text-lg text-[#e8e2d4]">
                        <ReactMarkdown>{t('services_grid.items.item8_desc')}</ReactMarkdown>
                    </div>
                </div>
                {/* Content Set B (initially hidden) - this is state 8 */}
                <div ref={panel8ContentB} className="absolute inset-0 flex flex-col pt-12 px-12 bg-[#422f40] rounded-[3rem]">
                    <h1 className="text-4xl font-bold text-[#e8e2d4]">{t('services_grid.items.item9')}</h1>
                    <div className="markdown mt-4 text-lg text-[#e8e2d4]">
                        <ReactMarkdown>{t('services_grid.items.item9_desc')}</ReactMarkdown>
                    </div>
                </div>
            </div>

            {/* Panel 10: Image Panel for state 9 (copy of panel5) */}
            <div ref={panel9} className="absolute top-2 left-[calc(50%)] w-[calc(50%-1.5rem)] h-[calc(100%-1rem)] rounded-[3rem] z-50 overflow-hidden">
                <div className="relative w-full h-full">
                    <img src="../Assets/tech.jpg" alt="Dental technology" className="absolute w-full h-full object-cover" />
                    <img ref={image9Ref} src="../Assets/g.webp" alt="A person with decorative braces, close-up." className="absolute w-full h-full object-cover" />
                    <img ref={image10Ref} src="../Assets/g3.png" alt="Another dental image" className="absolute w-full h-full object-cover" />
                </div>
            </div>

            {/* Panel 11: Text Panel for state 10 (copy of panel6) */}
            <div ref={panel10} className="absolute top-2 left-[calc(49.5%)] w-[calc(50%-1rem)] h-[calc(100%-1rem)] bg-[#422f40] rounded-[3rem] z-40 overflow-hidden">
                {/* Content Set A */}
                <div ref={panel10ContentA} className="absolute inset-0 flex flex-col pt-12 px-12">
                    <h1 className="text-4xl font-bold text-[#e8e2d4]">{t('services_grid.items.item10')}</h1>
                    <div className="markdown mt-4 text-lg text-[#e8e2d4]">
                        <ReactMarkdown>{t('services_grid.items.item10_desc')}</ReactMarkdown>
                    </div>
                </div>
                {/* Content Set B (initially hidden) */}
                <div ref={panel10ContentB} className="absolute inset-0 flex flex-col pt-12 px-12 bg-[#422f40] rounded-[3rem]">
                    <h1 className="text-4xl font-bold text-[#e8e2d4]">{t('services_grid.items.item11')}</h1>
                    <div className="markdown mt-4 text-lg text-[#e8e2d4]">
                        <ReactMarkdown>{t('services_grid.items.item11_desc')}</ReactMarkdown>
                    </div>
                </div>
            </div>

            {/* Panel 12: The final panel */}
            <div ref={panel11} className="absolute top-2 left-[calc(50%)] w-[calc(50%-1.5rem)] h-[calc(100%-1rem)] rounded-[3rem] z-30 overflow-hidden">
                <img src="../Assets/majd.png" alt="Final service image" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};

export default ScrollHero; 
