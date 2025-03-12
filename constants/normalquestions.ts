
export const questions = [
  { id: 1, question: '1. Since we had only gone a mile from camp, we decided to return before dark. What type of sentence is this?', type: 'mc', options: ['A. Simple Sentence', 'B. Compound Sentence', 'C. Complex Sentence', 'D. Compound-Complex Sentence'], answer: 'C. Complex Sentence' },
  { id: 2, question: '2. I don’t like my job very much. I’m going to _________ and look for another one.', type: 'mc', options: ['A.fire', 'B. finish', 'C. resign', 'D. retire'], answer: 'C. resign' },
  { id: 3, question: '3. Barbara and Joanne whispered and giggled all night.', type: 'mc', options: ['A. Simple Sentence', 'B. Compound Sentence', 'C. Complex Sentence', 'D. Compound-Complex Sentence'], answer: 'A. Simple Sentence' },
  { id: 4, question: '4. Those clouds promise rain, so we should hurry up and leave before we get caught in a flash flood.', type: 'mc', options: ['A. Simple sentence', 'B. Compound Sentence', 'C. Complex Sentence', 'D. Compound-Complex Sentence'], answer: 'D. Compound-Complex Sentence' },
  { id: 5, question: '5. I _________ swimming every Saturday morning.', type: 'mc', options: ['A. play', 'B. played', 'C. do', 'D. go'], answer: 'D. go' },
  // Text input questions (for 6th to 11th)
  { id: 6, question: '6. Mary could not go out with me ­­6.­_____ I invited Anne instead. Anne was very happy to accept my invitation _____ the film was very popular. Anne and I had a good time _____ next day Mary was very angry. "Do you love me _____ do you love Anne?" she asked me. "I like both you _____ Anne," I answered. "Look!" said Mary. "Either you go out with me _____ you go out with Anne.  Choices: SO, AND, BECAUSE, BUT, OR', type: 'text', answer: 'so' },
  { id: 7, question: '7. Mary could not go out with me ­­6.­_____ I invited Anne instead. Anne was very happy to accept my invitation _____ the film was very popular. Anne and I had a good time _____ next day Mary was very angry. "Do you love me _____ do you love Anne?" she asked me. "I like both you _____ Anne," I answered. "Look!" said Mary. "Either you go out with me _____ you go out with Anne.  Choices: SO, AND, BECAUSE, BUT, OR:', type: 'text', answer: 'because' },
  { id: 8, question: '8. Mary could not go out with me ­­6.­_____ I invited Anne instead. Anne was very happy to accept my invitation _____ the film was very popular. Anne and I had a good time _____ next day Mary was very angry. "Do you love me _____ do you love Anne?" she asked me. "I like both you _____ Anne," I answered. "Look!" said Mary. "Either you go out with me _____ you go out with Anne.  Choices: SO, AND, BECAUSE, BUT, OR:', type: 'text', answer: 'but' },
  { id: 9, question: '9. Mary could not go out with me ­­6.­_____ I invited Anne instead. Anne was very happy to accept my invitation _____ the film was very popular. Anne and I had a good time _____ next day Mary was very angry. "Do you love me _____ do you love Anne?" she asked me. "I like both you _____ Anne," I answered. "Look!" said Mary. "Either you go out with me _____ you go out with Anne.  Choices: SO, AND, BECAUSE, BUT, OR:', type: 'text', answer: 'or' },
  { id: 10, question: '10. Mary could not go out with me ­­6.­_____ I invited Anne instead. Anne was very happy to accept my invitation _____ the film was very popular. Anne and I had a good time _____ next day Mary was very angry. "Do you love me _____ do you love Anne?" she asked me. "I like both you _____ Anne," I answered. "Look!" said Mary. "Either you go out with me _____ you go out with Anne.  Choices: SO, AND, BECAUSE, BUT, OR:', type: 'text', answer: 'and' },
  { id: 11, question: '11. Mary could not go out with me ­­6.­_____ I invited Anne instead. Anne was very happy to accept my invitation _____ the film was very popular. Anne and I had a good time _____ next day Mary was very angry. "Do you love me _____ do you love Anne?" she asked me. "I like both you _____ Anne," I answered. "Look!" said Mary. "Either you go out with me _____ you go out with Anne.  Choices: SO, AND, BECAUSE, BUT, OR:', type: 'text', answer: 'or' },
  { id: 12, question: '12. Excuse me, I think you’ve _________ a mistake in our bill.', type: 'mc', options: ['A. given', 'B. done', 'C. had', 'D. made'], answer: 'D. made' },
  { id: 13, question: '13. What time do you go to _________ every day?', type: 'mc', options: ['A. workplace', 'B. work', 'C. job', 'D. office'], answer: 'B. work' },
  { id: 14, question: '14. What is a grocery store?', type: 'mc', options: ['A. An establishment that cooks food for customers', 'B. There are several definitions of a grocery store', 'C. A place to sell and trade goods', 'D. An establishment that distributes foods, drinks, household products, and other items that are used by the typical consumer'], answer: 'D. An establishment that distributes foods, drinks, household products, and other items that are used by the typical consumer' },
  { id: 15, question: '15. She doesn’t have brothers or sisters – she’s _________.', type: 'mc', options: ['A. an only child', 'B. a single child', 'C. a lonely child', 'D. an alone child'], answer: 'A. an only child' },
  { id: 16, question: '16. Pizza is my favorite food.', type: 'mc', options: ['A. Simple sentence', 'B. Compound Sentence', 'C. Complex Sentence', 'D. Compound-Complex Sentence'], answer: 'A. Simple sentence' },
  { id: 17, question: '17. Fresh fruits and vegetables are collectively referred to as which of the following terms?', type: 'mc', options: ['A. Produce', 'B. Feggies', 'C. Veggies', 'D. Famine'], answer: 'A. Produce' },
  { id: 18, question: '18. What are staples?', type: 'mc', options: ['A. Small pieces of metal used to hold papers together', 'B. Rare foods', 'C. Foods that play a prominent role in the average diet', 'D. Green fruits and vegetables'], answer: 'C. Foods that play a prominent role in the average diet' },
  { id: 19, question: '19. More vegetables are stocked in grocery stores than fruits because:', type: 'mc', options: ['A. Fruits stay fresh for less time than vegetables', 'B. Vegetables are more popular than fruits, generally speaking', 'C. Grocery store managers prefer fruits', 'D. A and B'], answer: 'A. Fruits stay fresh for less time than vegetables' },
  { id: 20, question: '20. "Fresh" groceries are:', type: 'mc', options: ['A. Prepared by employees', 'B. Measured manually', 'C. Charged by the pound', 'D. All of the Above'], answer: 'D. All of the Above' },
 








];

