import {expectType} from 'tsd';
import wrap from '.';

expectType<string>(wrap("The quick brown fox jumps over the lazy dog.", 10));
