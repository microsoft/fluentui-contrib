export interface LibraryGeneratorSchema {
  name: string;
  owner: string;
  testEnvironment?: 'jsdom' | 'node';
}
