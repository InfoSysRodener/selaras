// eslint-disable-next-line import/no-named-as-default
import Amplify from 'aws-amplify';
import { Auth } from '@aws-amplify/auth'
import awsconfig from '~/aws-exports';

Amplify.configure({ ...awsconfig, ssr: true });
Auth.configure(awsconfig);